import { Review, ReviewTag } from "@prisma/client";
import {
  ChartValue,
  ProfessorAnalysis,
  ReviewsByQuality,
  TagAmount,
} from "./models/reviews";

const OptimisticNumberOfChartPoints = 7;

type Year = {
  Months: MonthReviews[];
};

type MonthReviews = {
  Reviews: Review[];
  DifficultySum: number;
  QualitySum: number;
};

function getMonthReviews(year: Year, month: number): MonthReviews {
  return year.Months[month - 1];
}

function addMonthReviews(year: Year, month: number, reviews: MonthReviews) {
  year.Months[month - 1] = reviews;
}

function difficultyAverage(reviews: MonthReviews): number {
  return reviews.DifficultySum / reviews.Reviews.length;
}

function qualitySumAverage(reviews: MonthReviews): number {
  return reviews.QualitySum / reviews.Reviews.length;
}

async function beginAnalysis(reviews: Review[]): Promise<ProfessorAnalysis> {
  const values = await calculateChartValues(reviews);
  return {
    tagAmount: getTags(reviews),
    averageRatingValues: values,
    numberOfReviewsByQuality: getNumberOfReviewsByQuality(reviews),
  };
}

function getTags(reviews: Review[]): TagAmount[] {
  const tagMap: { [key: string]: number } = {};

  reviews.forEach((review) => {
    review.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  return Object.entries(tagMap).map(
    ([tag, count]) =>
      ({
        tag,
        amount: count,
      } as TagAmount)
  );
}

async function calculateChartValues(reviews: Review[]): Promise<ChartValue[]> {
  const years: { [key: number]: Year } = {};

  reviews.forEach((review) => {
    const t = review.time;
    const year = t.getFullYear();
    if (!years[year]) {
      years[year] = {
        Months: Array(12)
          .fill(null)
          .map(() => ({ Reviews: [], DifficultySum: 0, QualitySum: 0 })),
      };
    }

    const monthReviews = getMonthReviews(years[year], t.getMonth() + 1);
    monthReviews.Reviews.push(review);
    monthReviews.DifficultySum += review.difficulty || 0;
    monthReviews.QualitySum += review.quality;
    addMonthReviews(years[year], t.getMonth() + 1, monthReviews);
  });

  const amountOfYears = Object.keys(years).length;
  if (amountOfYears === 1) {
    const [yearInt, year] = Object.entries(years)[0];
    return calculateOneYear([], year, parseInt(yearInt));
  }

  return calculate(reviews, OptimisticNumberOfChartPoints);
}

function calculateOneYear(
  values: ChartValue[],
  year: Year,
  yearInt: number
): ChartValue[] {
  const months = year.Months;

  if (months.length < 5) {
    throw new Error(
      "This professor has too few reviews across time to provide a relevant chart"
    );
  }

  const fixedMonth = Math.min(months.length, OptimisticNumberOfChartPoints);

  for (let i = fixedMonth; i >= 0; i--) {
    const monthReviews = months[i];
    const englishMonth = new Date(0, i).toLocaleString("default", {
      month: "long",
    });

    values.push({
      value: monthReviews.QualitySum,
      month: englishMonth,
      year: yearInt,
    });
  }
  return values;
}

function calculate(reviews: Review[], numberOfPoints: number): ChartValue[] {
  if (reviews.length === 0) {
    return [];
  }
  const chunkSize = Math.floor(reviews.length / numberOfPoints);

  if (chunkSize === 0) {
    return reviews.map((review) => ({
      value: review.quality,
      month: review.time.toLocaleString("default", { month: "long" }),
      year: review.time.getFullYear(),
    }));
  }

  const chartValues: ChartValue[] = [];
  let completed = 0;

  while (numberOfPoints > 0) {
    let currentSum = 0;
    let timeMillisSum = 0;

    for (let i = 0; i < chunkSize; i++) {
      const review = reviews[completed];
      timeMillisSum += review.time.getTime();
      currentSum += review.quality;
      completed++;
    }

    const average = currentSum / chunkSize;
    const t = new Date(timeMillisSum / chunkSize);
    chartValues.push({
      value: average,
      month: t.toLocaleString("default", { month: "long" }),
      year: t.getFullYear(),
    });

    numberOfPoints--;
  }

  return chartValues;
}

export { beginAnalysis };

function getNumberOfReviewsByQuality(reviews: Review[]): ReviewsByQuality[] {
  const qualityMap: { [key: number]: number } = Object.values(reviews).reduce(
    (acc, review) => {
      acc[Math.ceil(review.quality)] =
        (acc[Math.ceil(review.quality)] || 0) + 1;
      return acc;
    },
    {} as { [key: number]: number }
  );

  return Object.entries(qualityMap).map(
    ([quality, amount]) =>
      ({
        quality: parseInt(quality),
        amount,
      } as ReviewsByQuality)
  );
}
