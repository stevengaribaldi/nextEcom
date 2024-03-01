import { LucideProps } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 512 512">
      <g>
        <img src={'/public/sila.svg'} alt="My Icon" />
      </g>
    </svg>
  ),
};
// public\sila.svg