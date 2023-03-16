import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import "./SiteMenu.css";

export const MySidebar = () => {
  const { toggleSidebar, broken } = useProSidebar();

  // NOTE: For below. Hacking styles. rtl does not have a way to remove border and !important is not seen as valid by the
  // linter.
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: "400px",
        position: "absolute",
        zIndex: "1000",
      }}
    >
      <Sidebar
        customBreakPoint="5000px"
        transitionDuration={200}
        backgroundColor="black"
        rootStyles={{
          border: "none",
          borderLeftStyle: "none !important" as "none",
          borderRightStyle: "none",
        }}
        rtl={true}
      >
        <Menu>
          <a href="/how-to-play">
            <MenuItem>How To Play</MenuItem>
          </a>
        </Menu>
      </Sidebar>
      {broken && (
        <button className="sb-button" onClick={() => toggleSidebar()}>
          ☰
        </button>
      )}
      {/* <main style={{ padding: 10 }}>
        <div>
        </div>
      </main> */}
    </div>
  );
};

export default function SiteMenuContainer() {
  return (
    <ProSidebarProvider>
      <MySidebar />
    </ProSidebarProvider>
  );
}
