import React, {
  createContext,
  Dispatch,
  memo,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';

interface IReact {
  children: React.ReactNode;
}

// tabs = [
//   {
//     id: 'rb:3',
//     title: < onClick={() => setActiveTab(this.id)}></>,
//     body: < hidden={activeTab !== 'rb:3'}></>,
//   }
// ];

interface ITabsProps extends IReact {}

interface Tab {
  id: number;
  title: React.ReactNode;
  body: React.ReactNode;
}

interface ITabsContext {
  activeTab: number;
  setActiveTab: (id: number) => void;

  tabCount: number;
  incrementTabCount: () => void;
  decremenTabCount: () => void;

  tabs: Tab[];
  setTabs: (tab: Tab) => void;
}

const TabContext = createContext<ITabsContext>({} as ITabsContext);

function Tabs({ children }: ITabsProps) {
  const [activeTab, setActiveTab] = useState(1);
  const [tabCount, setTabCount] = useState(0);

  const [tabs, setTabList] = useState<Tab[]>([] as Tab[]);

  const incrementTabCount = useCallback(() => {
    setTabCount((count) => (count += 1));
  }, []);
  const decremenTabCount = useCallback(() => {
    setTabCount((count) => (count -= 1));
  }, []);

  function arrUnique(arr: Tab[]): Tab[] {
    var flags: any = {};
    var uniqueTabs = arr.filter(function (tab: Tab) {
      if (flags[tab.id]) {
        return false;
      }
      flags[tab.id] = true;
      return true;
    });

    return uniqueTabs;
  }

  function setTabs(tab: Tab) {
    const hasTab = tabs.find((t) => t.id == tab.id);

    if (!hasTab) {
      setTabList((tabs) => [...tabs, tab]);
    }
  }
  console.log(activeTab);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        tabCount,
        decremenTabCount,
        incrementTabCount,
        tabs,
        setTabs,
      }}
    >
      {arrUnique(tabs).map((tab) => (
        <div onClick={() => setActiveTab(tab.id)}>{tab.title}</div>
      ))}
      <br />
      {children}
    </TabContext.Provider>
  );
}

function TabsConsumer({
  id,
  title,
  children,
}: {
  id: number;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <TabContext.Consumer>
      {(state) => <Tab id={id} title={title} children={children} {...state} />}
    </TabContext.Consumer>
  );
}

interface ITabProps extends IReact {
  title: React.ReactNode;
  id: number;
  children: React.ReactNode;

  activeTab: number;
  setActiveTab: (id: number) => void;

  tabCount: number;
  incrementTabCount: () => void;
  decremenTabCount: () => void;

  tabs: Tab[];
  setTabs: (tab: Tab) => void;
}

const Tab = memo(function ({
  activeTab,
  setActiveTab,
  tabCount,
  decremenTabCount,
  incrementTabCount,
  tabs,
  setTabs,
  title,
  id,
  children,
}: ITabProps) {
  let count = 0;
  useEffect(() => {
    incrementTabCount();

    setTabs({
      id,
      title,
      body: <></>,
    });

    return () => {
      decremenTabCount();
    };
  }, []);

  return (
    <>
      <div style={{ display: `${activeTab === id ? '' : 'none'}` }}>
        {children}
      </div>
    </>
  );
});

Tabs.Tab = memo(TabsConsumer);

export default Tabs;
