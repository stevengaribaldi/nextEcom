import { Button } from './ui/button';
import { PRODUCT_CATEGORIES } from './config/index';

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button className="gap-1.5 text-gray-900">Icons</Button>
      </div>
    </div>
  );
};

export default NavItem;
