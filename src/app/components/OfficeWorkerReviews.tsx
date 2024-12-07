import React from "react";

interface Props {
  reviews: any;
}

const OfficeWorkerReviews = ({ reviews }: Props) => {
  return (
    <>
      <section className="bg-white  antialiased dark:bg-gray-900 border-b-1 ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.map(
              (review: {
                text: string;
                reviewerName: string;
                reviewerSurname: string;
                createdAt: Date;
                avg: number;
              }) => (
                <div
                  key={review.text}
                  className="gap-3 pb-6 sm:flex sm:items-start"
                >
                  <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.floor(review.avg))].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      ))}
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {review.reviewerName} {review.reviewerSurname}
                      </p>
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {review.createdAt.toLocaleDateString("tr-TR")}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1">
                      <svg
                        className="h-5 w-5 text-primary-700 dark:text-primary-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {review.text}
                    </p>
                  </div>
                </div>
              )
            )}{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default OfficeWorkerReviews;
