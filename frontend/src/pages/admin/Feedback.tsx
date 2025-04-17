import React, { useEffect, useState } from "react";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  userId: number | null;
}

const AdminFeedbackPage: React.FC = () => {
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Admin Feedback</h1>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {feedbacks.length === 0 ? (
            <p>No feedbacks available.</p>
          ) : (
            feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <p>
                  <strong>Name:</strong> {feedback.name}
                </p>
                <p>
                  <strong>Email:</strong> {feedback.email}
                </p>
                <p>
                  <strong>Message:</strong> {feedback.message}
                </p>
                <p>
                  <strong>User ID:</strong> {feedback.userId || "Guest"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackPage;
