export default function HowToMeasure() {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-gray-50 rounded-lg overflow-hidden p-6 md:p-8">
        {/* Description at the top */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            How to Measure
          </h2>
          <p className="text-gray-700">
            Getting the right fit is essential for comfort and style. Follow our
            simple measurement guide to ensure you select the perfect size for
            your body type. Taking accurate measurements will help you find
            clothing that fits well and flatters your figure. Use a soft
            measuring tape and follow the instructions below.
          </p>
        </div>

        {/* Three measurement imgs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="Bust/Chest measurement"
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">Bust/Chest</h3>
            <p className="text-gray-600 text-center">
              Measure around the fullest part of your bust/chest, keeping the
              tape measure parallel to the floor.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="Waist measurement"
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">Waist</h3>
            <p className="text-gray-600 text-center">
              Measure around your natural waistline, which is the narrowest part
              of your torso, typically 1-2 inches above your belly button.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="Hip measurement"
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">Hips</h3>
            <p className="text-gray-600 text-center">
              Measure around the fullest part of your hips, approximately 7-9
              inches below your waistline.
            </p>
          </div>
        </div>

        {/* Button at the bottom */}
        <div className="text-center">
          <a
            href="/measurements"
            className="inline-block bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Add Measurement
          </a>
          <p className="mt-4 text-gray-500 text-sm">
            Save your measurements to your profile for easier shopping in the
            future.
          </p>
        </div>
      </div>
    </div>
  );
}
