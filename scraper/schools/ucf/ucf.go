package ucf

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/FindMyProfessors/scraper/model"
	"github.com/FindMyProfessors/scraper/rmp"
	"github.com/FindMyProfessors/scraper/util"
)

var UCF_COURSE_MODALITIES = [5]string{"WW", "V", "M", "RS", "P"}
var UCF_COURSE_PREFIXES = [247]string{"ACG", "ADE", "ADV", "AFA", "AFH", "AFR", "AMH", "AML", "ANT", "APK", "ARA", "ARC", "ARE", "ARH", "ART", "ASH", "ASL", "AST", "ATR", "BCH", "BME", "BOT", "BSC", "BTE", "BUL", "CAP", "CCE", "CCJ", "CDA", "CEG", "CEN", "CES", "CGN", "CGS", "CHI", "CHM", "CHS", "CIS", "CJC", "CJE", "CJJ", "CJL", "CJT", "CLP", "CLT", "CNT", "COM", "COP", "COT", "CPO", "CRW", "CWR", "DAA", "DAE", "DAN", "DEP", "DIG", "DSC", "EAB", "EAP", "EAS", "ECM", "ECO", "ECP", "ECS", "ECT", "ECW", "EDE", "EDF", "EDG", "EDP", "EEC", "EEE", "EEL", "EES", "EEX", "EGM", "EGN", "EGS", "EIN", "EMA", "EME", "EML", "ENC", "ENG", "ENL", "ENT", "ENV", "ENY", "ESE", "ESI", "EUH", "EVR", "EXP", "FIL", "FIN", "FLE", "FOL", "FRE", "FRT", "FRW", "FSS", "GEA", "GEB", "GEO", "GER", "GEW", "GEY", "GIS", "GLY", "GRA", "HAI", "HAT", "HBR", "HCW", "HFT", "HIM", "HIS", "HLP", "HSA", "HSC", "HUM", "HUN", "IDC", "IDH", "IDS", "IHS", "INP", "INR", "ISC", "ITA", "ITT", "ITW", "JOU", "JPN", "JST", "KOR", "LAE", "LAH", "LAS", "LDR", "LEI", "LIN", "LIT", "MAA", "MAC", "MAD", "MAE", "MAN", "MAP", "MAR", "MAS", "MAT", "MCB", "MET", "MGF", "MHF", "MHS", "MLS", "MMC", "MSL", "MTG", "MUC", "MUE", "MUG", "MUH", "MUL", "MUM", "MUN", "MUO", "MUS", "MUT", "MVB", "MVJ", "MVK", "MVP", "MVS", "MVV", "MVW", "NSP", "NUR", "OCE", "OSE", "PAD", "PAF", "PAZ", "PCB", "PCO", "PEL", "PEM", "PEO", "PET", "PGY", "PHH", "PHI", "PHM", "PHP", "PHT", "PHY", "PHZ", "PLA", "POR", "POS", "POT", "PPE", "PSB", "PSC", "PSY", "PUP", "PUR", "QMB", "REA", "RED", "REE", "REL", "RTV", "RUS", "RUT", "SCC", "SCE", "SLS",
	"SOP", "SOW", "SPA", "SPB", "SPC", "SPM", "SPN", "SPT", "SPW", "SSE", "STA", "SYA", "SYD", "SYG", "SYO", "SYP", "TAX", "THE", "TPA", "TPP", "TSL", "TTE", "VIC", "WOH", "WST", "ZOO"}
var UCF_RMP_IDS = []int{1082, 15516, 5567, 5400}

type Scraper struct {
	term         model.Term
	CourseMap    map[string]*model.Course
	ProfessorMap map[string]*model.Professor

	FailedURLs    map[string]int
	RecoveredURLs map[string]bool
}

func (u *Scraper) Scrape() (*model.School, error) {
	log.Println("Starting scrape process...")
	u.CourseMap = map[string]*model.Course{}
	u.ProfessorMap = map[string]*model.Professor{}
	u.FailedURLs = map[string]int{}
	u.RecoveredURLs = map[string]bool{}

	var wg sync.WaitGroup
	batchSize := 10               // Define the batch size
	sem := make(chan struct{}, 1) // Semaphore with a capacity of 1

	for i := 0; i < len(UCF_COURSE_MODALITIES); i += batchSize {
		end := i + batchSize
		if end > len(UCF_COURSE_MODALITIES) {
			end = len(UCF_COURSE_MODALITIES)
		}
		batch := UCF_COURSE_MODALITIES[i:end]

		for _, modality := range batch {
			for _, prefix := range UCF_COURSE_PREFIXES {
				url := fmt.Sprintf(
					"https://cdl.ucf.edu/wp-content/themes/cdl/lib/course-search-ajax.php?call=classes&term=%s&prefix=%s&catalog=&title=&instructor=&career=&college=&department=&mode=%s",
					u.term.ID,
					prefix,
					modality,
				)

				log.Printf("Scraping URL: %s\n", url)
				mu := &sync.Mutex{}

				sem <- struct{}{} // Acquire a slot
				wg.Add(1)
				go func(url string) {
					defer wg.Done()
					defer func() { <-sem }() // Release the slot
					u.scrapeWithBackoff(url, mu)
				}(url)
			}
		}
		wg.Wait() // Wait for the current batch to complete
	}

	close(sem)

	var courseArray []*model.Course
	for _, course := range u.CourseMap {
		courseArray = append(courseArray, course)
	}

	var professorArray []*model.Professor
	for _, professor := range u.ProfessorMap {
		professorArray = append(professorArray, professor)
	}

	school := &model.School{
		Name:       u.Name(),
		Professors: professorArray,
		Courses:    courseArray,
	}

	log.Println("Scraping completed, starting RMP API scrape...")
	// RMP API scrape code here...

	api := rmp.NewApi("dGVzdDp0ZXN0")
	err := api.StartScrape(context.Background(), school, UCF_RMP_IDS...)
	if err != nil {
		return nil, err
	}

	log.Println("Scrape process completed successfully.")
	return school, nil
}

func (u *Scraper) scrapeWithBackoff(url string, mu *sync.Mutex) {
	const maxRetries = 7
	const initialBackoff = 1 * time.Second
	vowels := []string{"a", "e", "i", "o", "u"}

	for attempt := 1; attempt <= maxRetries; attempt++ {
		success := u.scrape(url, mu)
		if success {
			u.recordRecovery(url)
			return
		}
		backoff := initialBackoff * time.Duration(math.Pow(2, float64(attempt)))
		log.Printf("Scrape failed, retrying in %v...\n", backoff)
		time.Sleep(backoff)
	}

	// If initial attempts fail, retry with vowels
	for _, vowel := range vowels {
		for attempt := 1; attempt <= maxRetries; attempt++ {
			vowelURL := fmt.Sprintf("%s&title=%s", url, vowel)
			success := u.scrape(vowelURL, mu)
			if success {
				u.recordRecovery(url)
				return
			}
			backoff := initialBackoff * (time.Duration(math.Pow(2, float64(attempt))))
			log.Printf("Scrape with vowel '%s' failed, retrying in %v...\n", vowel, backoff)
			time.Sleep(backoff)
		}
	}
	log.Printf("Scrape failed after %d attempts with vowels: %s\n", maxRetries, url)
	u.recordFailure(url)
}

func (u *Scraper) scrape(url string, mu *sync.Mutex) bool {
	log.Printf("Fetching data from URL: %s\n", url)
	response, err := http.Get(url)
	if err != nil {
		log.Println("HTTP request error:", err)
		u.recordFailure(url)
		return false
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Println("Error closing response body:", err)
			return
		}
	}(response.Body)
	body, err := io.ReadAll(response.Body)
	// Reading body of length
	log.Printf("Body length: %d\n", len(body))
	if err != nil {
		log.Println("Error reading response body:", err)
		u.recordFailure(url)
		return false
	}

	var data struct {
		Professors []Course `json:"classes"`
		Status     string   `json:"status"`
	}
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Println("JSON unmarshal error:", err)
		u.recordFailure(url)
		return false
	}

	if data.Status == "failure" {
		log.Println("Failed!!!!")
		u.recordFailure(url)
		return false
	}
	for _, ucfProfessor := range data.Professors {
		ucfProfessor.NameFirst = util.WashName(ucfProfessor.NameFirst)
		ucfProfessor.NameLast = util.WashName(ucfProfessor.NameLast)

		courseKey := ucfProfessor.CoursePrefix + ucfProfessor.CatalogNumber
		professorKey := ucfProfessor.NameFirst + "_" + ucfProfessor.NameLast

		mu.Lock()
		course, courseExists := u.CourseMap[courseKey]
		if !courseExists {
			course = &model.Course{
				Code: courseKey,
				Name: strings.ReplaceAll(ucfProfessor.CourseTitle, "\"", ""),
			}
			u.CourseMap[courseKey] = course
		}

		professor, professorExists := u.ProfessorMap[professorKey]
		if !professorExists {
			professor = &model.Professor{
				FirstName: strings.ReplaceAll(ucfProfessor.NameFirst, "/", ""),
				LastName:  strings.ReplaceAll(ucfProfessor.NameLast, "/", ""),
				Courses:   map[string]*model.Course{},
			}
			u.ProfessorMap[professorKey] = professor
		}

		if _, teachesCourse := professor.Courses[courseKey]; !teachesCourse {
			professor.Courses[courseKey] = course
		}
		mu.Unlock()
	}
	return true
}

func (u *Scraper) Terms() (terms []model.Term) {
	// SPRING 2021  = 1710
	// FALL 2022    = 1760

	// How are UCF Term IDs calculated?
	// UCF was founded June 10th 1963
	// SPRING 2023 = 1770
	// Using that ID we can work in reverse
	// 1770/10 = 177, divide by 10 because the ID is incremented by 10 every semester
	// 3 semesters per year so 177/3 = 59
	// 2022-59 = 1963
	// UCF was founded in 1963
	log.Println("Calculating terms...")
	currentYear := time.Now().Year() + 1
	// TODO: Only add next semester after, determine current semester and next

	for i := 0; i < 2; i++ {
		year := currentYear - i
		yearDifference := year - 1963

		semesterIndex := 2

		for i := 1; i < 4; i++ {
			semesterDifference := (yearDifference * 3) - i
			termId := semesterDifference * 10
			// Print term id
			log.Printf("Term ID: %d\n", termId)

			term := model.Term{
				Year:     year,
				Semester: model.AllSemesters[semesterIndex],
				ID:       strconv.Itoa(termId),
			}
			// Print term
			log.Printf("Term: %d %s\n", term.Year, term.Semester)
			terms = append(terms, term)

			semesterIndex--
		}

	}

	log.Println("Terms calculated successfully.")
	return terms
}

func (u *Scraper) Name() string {
	return "University of Central Florida"
}

func (u *Scraper) SetTerm(term model.Term) {
	log.Printf("Setting term: %d %s\n", term.Year, term.Semester)
	u.term = term
}

func (u *Scraper) recordFailure(url string) {
	u.FailedURLs[url]++
}

func (u *Scraper) recordRecovery(url string) {
	if u.FailedURLs[url] > 0 {
		u.RecoveredURLs[url] = true
	}
}

func (u *Scraper) PrintStats() {
	// Print them
	for url, count := range u.FailedURLs {
		log.Printf("Failed URL: %s, count: %d\n", url, count)
	}
	for url := range u.RecoveredURLs {
		log.Printf("Recovered URL: %s\n", url)
	}
}
