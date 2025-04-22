"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  userId: number | null;
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:8081/admin/feedback");

        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks.");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="border-b border-gray-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </td>
      </tr>
    ));
  };

  // Function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Feedback Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage user feedback submissions
            </p>
          </div>

          {error && (
            <div className="mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  renderSkeletons()
                ) : feedbacks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No feedbacks available
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        No feedback has been submitted yet.
                      </p>
                    </td>
                  </tr>
                ) : (
                  feedbacks.map((feedback) => (
                    <tr
                      key={feedback.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feedback.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {feedback.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          href={`mailto:${feedback.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {feedback.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <div className="truncate" title={feedback.message}>
                          {truncateText(feedback.message, 100)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.userId ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Registered User
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Guest
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {feedbacks.length} feedback entries
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
