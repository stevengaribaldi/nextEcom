import { LucideProps } from 'lucide-react';
import Image from 'next/image';

export const Icons = {
  logo: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 512 512">
      <g>
        <Image src={'/public/sila.svg'} alt="My Icon" />
      </g>
    </svg>
  ),
};
