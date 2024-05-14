import "./SiteMenu.css";
import { Drawer } from "vaul";

export const SiteMenuContainer = () => {
  return (
    <Drawer.Root noBodyStyles={true}>
      <Drawer.Trigger className="drawer-trigger">☰</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-outer">
          <div className="drawer-inner">
            <Drawer.Handle />
            <div className="drawer-content">
              <p>Content</p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SiteMenuContainer;
