import { Gift, LayoutDashboard, PackageOpen, SquareKanban } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Gift />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <PackageOpen />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          className="flex items-center gap-2 text-md cursor-pointer rounded-md px-3 py-4 text-foreground hover:bg-muted hover:text-foreground"
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 text-xl mb-5 mt-3 items-center">
                <SquareKanban size={30} />
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}></MenuItems>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("dashboard")}
        >
          <SquareKanban size={30} />
          <h1 className="text-2xl font-extrabold">Admin</h1>
        </div>
        <MenuItems></MenuItems>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
