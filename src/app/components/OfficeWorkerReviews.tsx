import React, { useState } from "react";

interface Props {
  reviews: any;
}

const OfficeWorkerReviews = ({ reviews }: Props) => {
  const [visibleReviews, setVisibleReviews] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreReviews = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleReviews((prev) => prev + 50);
      setIsLoading(false);
    }, 500);
  };

  const displayReviews = reviews.slice(0, visibleReviews);
  const hasMoreReviews = visibleReviews < reviews.length;

  return (
    <>
      <section className="bg-white antialiased dark:bg-gray-900 border-b-1">
        <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
          {displayReviews.map(
            (
              review: {
                review: string;
                text: string;
                firstName: string;
                lastName: string;
                createdAt: Date;
                avg: number;
                nameConsent: boolean;
              },
              index: number
            ) => (
              <div key={index} className="gap-3 pb-6 sm:flex sm:items-start">
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
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {review.nameConsent
                      ? `${review.firstName} ${review.lastName}`
                      : "Anonim"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0">
                  <p className="text-gray-600 dark:text-gray-300">
                    {review.review}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        {hasMoreReviews && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={loadMoreReviews}
              disabled={isLoading}
              className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Yükleniyor..." : "Daha fazla yorum göster"}
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default OfficeWorkerReviews;
