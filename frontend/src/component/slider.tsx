// "use client";

// import { useState, useEffect, useCallback } from "react";
// import styles from "./banner-slider.module.css";

// interface BannerSlide {
//   id: number;
//   imageUrl: string;
//   title: string;
//   description: string;
//   ctaText?: string;
//   ctaLink?: string;
// }

// interface BannerSliderProps {
//   slides: BannerSlide[];
//   autoSlideInterval?: number;
//   className?: string;
// }

// export function Slider({
//   slides,
//   autoSlideInterval = 5000,
//   className,
// }: BannerSliderProps) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   }, [slides.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   }, [slides.length]);

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   useEffect(() => {
//     if (isPaused) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, autoSlideInterval);

//     return () => clearInterval(interval);
//   }, [nextSlide, autoSlideInterval, isPaused]);

//   return (
//     <div
//       className={`${styles.sliderContainer} ${className || ""}`}
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div
//         className={styles.sliderTrack}
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className={styles.slide}>
//             <img
//               src={slide.imageUrl || "/placeholder.svg"}
//               alt={slide.title}
//               className={styles.slideImage}
//             />
//             <div className={styles.slideOverlay}>
//               <div className={styles.slideContent}>
//                 <h2 className={styles.slideTitle}>{slide.title}</h2>
//                 <p className={styles.slideDescription}>{slide.description}</p>
//                 {slide.ctaText && slide.ctaLink && (
//                   <a href={slide.ctaLink} className={styles.ctaButton}>
//                     {slide.ctaText}
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         className={`${styles.navButton} ${styles.prevButton}`}
//         onClick={prevSlide}
//         aria-label="Previous slide"
//       >
//         <span className={`${styles.arrow} ${styles.arrowLeft}`}></span>
//       </button>

//       <button
//         className={`${styles.navButton} ${styles.nextButton}`}
//         onClick={nextSlide}
//         aria-label="Next slide"
//       >
//         <span className={`${styles.arrow} ${styles.arrowRight}`}></span>
//       </button>

//       {/* Indicator Dots */}
//       <div className={styles.indicators}>
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`${styles.indicator} ${
//               currentSlide === index ? styles.indicatorActive : ""
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
