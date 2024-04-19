// 'use client';
// import { useEffect, useRef } from 'react';
// import { motion, stagger, useAnimate, useAnimation } from 'framer-motion';
// import { cn } from '@/lib/utils';

// export const TextGenerateEffect = ({
//   words,
//   isValid, // Add an isValid prop
//   className,
// }: {
//   words: string;
//   isValid: boolean; // Expecting a boolean prop to control the animation
//   className?: string;
// }) => {
//   const controls = useAnimation(); // Using the useAnimation hook for more control
//   let wordsArray = words.split(' ');

//   useEffect(() => {
//     if (isValid) {
//       // Only trigger the animation if isValid is true
//       controls.start((i) => ({
//         opacity: 1,
//         transition: { delay: i * 0.3, duration: 0.5 }, // Adjust duration and delay as needed
//       }));
//     }
//   }, [isValid, controls]);

//   return (
//     <div className={cn('font-bold', className)}>
//       <motion.div className="text-white text-2xl leading-snug tracking-wide">
//         {wordsArray.map((word, idx) => (
//           <motion.span
//             key={idx}
//             custom={idx} // Pass the index as the custom prop
//             initial={{
//               opacity: 0.5, // Start semi-transparent for visibility
//               color: '#A0AEC0', // Initial color - gray
//             }}
//             animate={controls} // Control animation based on the isValid state
//             className="inline-block" // Ensure spans align correctly
//           >
//             {word}{' '}
//           </motion.span>
//         ))}
//       </motion.div>
//     </div>
//   );
// };
