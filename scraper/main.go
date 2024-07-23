package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/FindMyProfessors/scraper/fmp"
	"github.com/FindMyProfessors/scraper/model"
	"github.com/FindMyProfessors/scraper/rmp"
	"github.com/FindMyProfessors/scraper/schools"
	"github.com/FindMyProfessors/scraper/schools/ucf"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

var (
	SchoolScraperMap = []schools.SchoolScraper{&ucf.Scraper{}}
)

func main() {
	fmt.Println("Welcome to the FindMyProfessor's Scraper")

	if ShouldUseFile() {
		school, err := GetSchoolFromFile()
		if err != nil {
			panic(err)
		}

		// ask if they want to link RMP
		for {
			fmt.Printf("Would you like to link RMP (y/n)? ")
			var choice string
			_, err := fmt.Scanf("%s", &choice)
			if err != nil {
				fmt.Printf("Unable to scan choice: %v\n", err)
				continue
			}
			if strings.ToLower(choice) == "y" {
				api := rmp.NewApi("dGVzdDp0ZXN0")
				err = api.StartScrape(context.Background(), school, ucf.UCF_RMP_IDS...)
				if err != nil {
					panic(err)
				}
				// ask if they would like to save the file
				fmt.Printf("Would you like to save the file (y/n)? ")
				var saveChoice string
				_, err := fmt.Scanf("%s", &saveChoice)
				if err != nil {
					fmt.Printf("Unable to scan choice: %v\n", err)
					continue
				}
				if strings.ToLower(saveChoice) == "y" {
					// save the file
					// Ask for the name of the file
					fmt.Printf("Enter the name of the file: ")
					reader := bufio.NewReader(os.Stdin)
					fmt.Printf("Enter file path: ")
					scanner := bufio.NewScanner(reader)
					scanner.Scan()
					path := scanner.Text()

					pwd, _ := os.Getwd()
					path, err = filepath.Abs(filepath.Join(pwd, path))
					if err != nil {
						fmt.Printf("Unable to get the absolute path: %v\n", err)
						continue
					}

					marshal, err := json.Marshal(*school)
					if err != nil {
						panic(err)
					}

					err = os.WriteFile(path, marshal, 0644)
					if err != nil {
						panic(err)
					}
					fmt.Printf("Wrote %s to %s\n", school.Name, path)
				}
				break
			} else if strings.ToLower(choice) == "n" {
				break
			}
		}

		for _, scraper := range SchoolScraperMap {
			if scraper.Name() == school.Name {
				term := GetTerm(scraper)
				scraper.SetTerm(term)
				if ShouldSendToFMP() {
					ctx, api, err := fmp.NewApi(context.Background(), "joedoe", "Password123!")
					if err != nil {
						panic(err)
					}
					err = api.UpsertSchool(ctx, school, &term)
					if err != nil {
						panic(err)
					}
				}
				return
			}
		}
		return
	}

	scraper := GetSchoolScraper()

	fmt.Printf("Starting scraping of %s now\n", scraper.Name())
	term := GetTerm(scraper)
	scraper.SetTerm(term)
	school, err := scraper.Scrape()
	if err != nil {
		panic(err)
	}
	scraper.PrintStats()

	if ShouldWriteToFile() {
		fileName := fmt.Sprintf("%s-%d-%s.json", school.Name, term.Year, term.Semester)
		fmt.Printf("Writing the scraped school data to file %s\n", fileName)

		marshal, err := json.Marshal(*school)
		if err != nil {
			panic(err)
		}

		err = os.WriteFile(fileName, marshal, 0644)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Wrote %s to %s\n", school.Name, fileName)
	}

	if ShouldSendToFMP() {
		ctx, api, err := fmp.NewApi(context.Background(), "joedoe", "Password123!")
		if err != nil {
			panic(err)
		}
		err = api.UpsertSchool(ctx, school, &term)
		if err != nil {
			panic(err)
		}
	}
}

func GetSchoolScraper() schools.SchoolScraper {
	for i, scraper := range SchoolScraperMap {
		fmt.Printf("%d - %s\n", i, scraper.Name())
	}
	for {
		fmt.Printf("Which school would you like to scrape? ")

		var choice int
		_, err := fmt.Scanf("%d", &choice)
		if err != nil {
			fmt.Printf("Unable to scan choice: %v\n", err)
			continue
		}

		if choice > len(SchoolScraperMap) {
			fmt.Printf("%d is an invalid selection, please try again\n\n", choice)
			continue
		}
		return SchoolScraperMap[choice]
	}
}

func GetTerm(scraper schools.SchoolScraper) model.Term {
	for {
		terms := scraper.Terms()

		for i, term := range terms {
			fmt.Printf("%d - %s %s\n", i, strconv.Itoa(term.Year), cases.Title(language.English).String(strings.ToLower(string(term.Semester))))
		}

		fmt.Printf("Which term would you like to scrape? ")

		var choice int
		_, err := fmt.Scanf("%d", &choice)
		if err != nil {
			fmt.Printf("Unable to scan choice: %v\n", err)
			continue
		}

		if choice > len(terms) {
			fmt.Printf("%d is an invalid selection, please try again\n\n", choice)
			continue
		}
		return terms[choice]
	}
}

func ShouldWriteToFile() bool {
	for {
		fmt.Printf("Would you like to write the data to a file (y/n)? ")

		var choice string
		_, err := fmt.Scanf("%s", &choice)
		if err != nil {
			fmt.Printf("Unable to scan choice: %v\n", err)
			continue
		}

		switch strings.ToLower(choice) {
		case "y":
			return true
		case "n":
			return false
		default:
			fmt.Printf("%s is an invalid option. Choose 'y' or 'n'.\n", choice)
			continue
		}
	}
}

func ShouldSendToFMP() bool {
	for {
		fmt.Printf("Would you like to send the data to FMP (y/n)? ")

		var choice string
		_, err := fmt.Scanf("%s", &choice)
		if err != nil {
			fmt.Printf("Unable to scan choice: %v\n", err)
			continue
		}

		switch strings.ToLower(choice) {
		case "y":
			return true
		case "n":
			return false
		default:
			fmt.Printf("%s is an invalid option. Choose 'y' or 'n'.\n", choice)
			continue
		}
	}
}

func ShouldUseFile() bool {
	for {
		fmt.Printf("Would you like to use a previous scrape file (y/n)? ")
		var choice string
		_, err := fmt.Scanf("%s", &choice)
		if err != nil {
			fmt.Printf("Unable to scan choice: %v\n", err)
			continue
		}

		switch strings.ToLower(choice) {
		case "y":
			return true
		case "n":
			return false
		default:
			fmt.Printf("%s is an invalid option. Choose 'y' or 'n'.\n", choice)
			continue
		}
	}
}

func GetSchoolFromFile() (*model.School, error) {
	var school model.School
	for {
		reader := bufio.NewReader(os.Stdin)
		fmt.Printf("Enter file path: ")
		scanner := bufio.NewScanner(reader)
		scanner.Scan()
		path := scanner.Text()

		pwd, _ := os.Getwd()
		path, err := filepath.Abs(filepath.Join(pwd, path))
		if err != nil {
			fmt.Printf("Unable to get the absolute path: %v\n", err)
			continue
		}

		jsonFile, err := os.ReadFile(path)
		if err != nil {
			fmt.Printf("Unable to read json: %v\n", err)
			continue
		}

		err = json.Unmarshal(jsonFile, &school)
		if err != nil {
			fmt.Printf("Unable to unmarshal json: %v\n", err)
			continue
		}
		break
	}
	return &school, nil
}
