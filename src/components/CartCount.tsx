// import React, { useEffect } from 'react';
// import { useCart } from '@/hooks/use-cart';

// const CartCount = ({ isPaid }: { isPaid: boolean }) => {
//   const { items, clearCart } = useCart();
//   const itemCount = items.length;

//   useEffect(() => {
//     if (isPaid) {
//       clearCart();
//     }
//   }, [isPaid, clearCart]);

//   return <div>{isPaid ? <p>.</p> : { items }}</div>;
// };

// export default CartCount;
