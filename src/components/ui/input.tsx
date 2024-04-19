// 'use client';
// import * as React from 'react';

// import { cn } from '@/lib/utils';
// import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     const radius = 80; // change this to increase the rdaius of the hover effect
//     const [visible, setVisible] = React.useState(false);

//     let mouseX = useMotionValue(0);
//     let mouseY = useMotionValue(0);

//     function handleMouseMove({ currentTarget, clientX, clientY }: any) {
//       let { left, top } = currentTarget.getBoundingClientRect();

//       mouseX.set(clientX - left);
//       mouseY.set(clientY - top);
//     }
//     return (
//       <motion.div
//         style={{
//           background: useMotionTemplate`
//         radial-gradient(
//           ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
//           var(--blue-400),
//           transparent 80%
//         )
//       `,
//         }}
//         onMouseMove={handleMouseMove}
//         onMouseEnter={() => setVisible(true)}
//         onMouseLeave={() => setVisible(false)}
//         className="p-[2px] rounded-lg transition duration-300 group/input"
//       >
//         <input
//           type={type}
//           className={cn(
//             `flex h-10 w-full border-none  bg-neutral-800  text-white  rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
//           file:text-sm file:font-medium placeholder-text-neutral-900
//           focus-visible:outline-none focus-within:file: focus-visible:ring-[1px]  focus-visible:ring-blue-500 ring-black
//            disabled:cursor-not-allowed disabled:opacity-50
//            shadow-[0px_0px_0px_0px_var(--blue-900)]
//          focus:shadow-[0px_0px_1px_1px_var(--blue-700)]

//            group-hover/input:shadow-none transition duration-400
//            `,
//             className,
//           )}
//           ref={ref}
//           {...props}
//         />
//       </motion.div>
//     );
//   },
// );
// Input.displayName = 'Input';

// export { Input };
