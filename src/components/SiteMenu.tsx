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
          <div className="drawer-footer">
            <div>
              <p>Where in the Worldle © {new Date().getFullYear()}</p>
            </div>
            <div>
              <a
                href="https://buymeacoffee.com/brendanbeltz
"
                target="_blank"
              >
                Buy me a 🌮
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SiteMenuContainer;
