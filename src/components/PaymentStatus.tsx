'use client';

import { trpc } from '@/trpc/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  const router = useRouter();

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: !isPaid,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    },
  );
  const { clearCart } = useCart();

  useEffect(() => {
    if (data?.isPaid) router.refresh();
    clearCart();
  }, [data?.isPaid, router, clearCart]);

  return (
    <div className="mt-16 grid grid-col-2 gapx-x4 text-sm text-orange-50 ">
      <div>
        <p className="font-bold text-white">Shipping To:</p>
        <p className="text-lg font-semibold">{orderEmail}</p>
      </div>
      <div className="mt-2">
        <p className="font-medium">Order Status</p>
        <p>{isPaid ? 'Payment Successful' : 'Pending Payment'}</p>
      </div>
    </div>
  );
};
export default PaymentStatus;
