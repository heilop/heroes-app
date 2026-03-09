import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router';
import { Link } from 'react-router';

export const CustomMenu = () => {
  const { pathname } = useLocation();
  const isActive = (path: string) => {
   return pathname === path;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={ cn(isActive('/') && 'bg-slate-200', ' rounded-md p-2') }>
            <Link to='/'>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={ cn(isActive('/search') && 'bg-slate-200', ' rounded-md p-2') }>
            <Link to='/search'>Search superhero</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
