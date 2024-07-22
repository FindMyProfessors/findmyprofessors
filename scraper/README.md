# Scraper

## Requirements

- Go 1.19+

## Compile

Run the following in your terminal:

```bash
go build
```

## Usage

```bash
./scraper
```

## Notes

The scraper will assume that the FMP endpoint is `localhost:8080`. Make sure the API is online!

## Example Procedures

### Pushing to FMP using existing json with RMP data

```bash
./scraper
```

Output:

```
Welcome to the FindMyProfessor's Scraper
Would you like to use a previous scrape file (y/n)? y
Enter file path: UCF-withfmp.json
path=/workspaces/findmyprofessors/scraper/UCF-withfmp.json
2024/07/22 15:44:22 Calculating terms...
2024/07/22 15:44:22 Term ID: 1850
2024/07/22 15:44:22 Term: 2025 FALL
2024/07/22 15:44:22 Term ID: 1840
2024/07/22 15:44:22 Term: 2025 SUMMER
2024/07/22 15:44:22 Term ID: 1830
2024/07/22 15:44:22 Term: 2025 SPRING
2024/07/22 15:44:22 Term ID: 1820
2024/07/22 15:44:22 Term: 2024 FALL
2024/07/22 15:44:22 Term ID: 1810
2024/07/22 15:44:22 Term: 2024 SUMMER
2024/07/22 15:44:22 Term ID: 1800
2024/07/22 15:44:22 Term: 2024 SPRING
2024/07/22 15:44:22 Terms calculated successfully.
0 - 2025 Fall
1 - 2025 Summer
2 - 2025 Spring
3 - 2024 Fall
4 - 2024 Summer
5 - 2024 Spring
Which term would you like to scrape? 3
2024/07/22 15:45:01 Setting term: 2024 FALL
Would you like to send the data to FMP (y/n)? y
```
