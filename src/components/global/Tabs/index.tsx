import clsx from 'clsx'
import React, {
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

interface IReact {
    children: React.ReactNode
}

interface Tab {
    id: number
    title: React.ReactNode
}

interface ITabsContext {
    activeTab: number
    setActiveTab: (id: number) => void

    tabsCount: number
    incrementTabsCount: () => void
    decremenTabsCount: () => void

    tabs: Tab[]
    setTabs: (tab: Tab) => void
}

const TabContext = createContext<ITabsContext>({} as ITabsContext)

interface ITabsProps extends IReact {}
function Tabs({ children }: ITabsProps) {
    const [activeTab, setActiveTab] = useState(1)
    const [tabsCount, setTabsCount] = useState(0)

    const [tabs, setTabList] = useState<Tab[]>([] as Tab[])

    const incrementTabsCount = useCallback(() => {
        setTabsCount((count) => (count += 1))
    }, [])

    const decremenTabsCount = useCallback(() => {
        setTabsCount((count) => (count -= 1))
    }, [])

    function arrUnique(arr: Tab[]): Tab[] {
        let keys: any = {}

        let arrUnique = arr.filter(function (tab: Tab) {
            if (keys[tab.id]) {
                return false
            }
            keys[tab.id] = true
            return true
        })

        return arrUnique
    }

    const setTabs = useCallback((tab: Tab) => {
        setTabList((tabs) => [...tabs, tab])
    }, [])

    return (
        <TabContext.Provider
            value={{
                activeTab,
                setActiveTab,
                tabsCount,
                decremenTabsCount,
                incrementTabsCount,
                tabs,
                setTabs,
            }}
        >
            <div className='flex justify-around mb-3 | border-b-2 border-gray-300'>
                {arrUnique(tabs).map((tab, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveTab(tab.id)}
                        className='flex-1 text-center -mb-0.5 py-4 | relative | text-sm text-[#333333] font-[600] | cursor-pointer group'
                    >
                        {tab.title}
                        <div
                            className={clsx({
                                'w-1/2 absolute left-1/4 right-0 bottom-0 rounded-t-full | z-10':
                                    true,
                                'border-b-[5px] border-[#2F80ED]/80':
                                    tab.id === activeTab,
                                'border-b-[5px] border-transparent group-hover:border-[#2F80ED]/50 duration-200':
                                    tab.id !== activeTab,
                            })}
                        ></div>
                    </div>
                ))}
            </div>

            <div className='w-full'>{children}</div>
        </TabContext.Provider>
    )
}

interface ITabProps extends IReact {
    id: number
    title: React.ReactNode
    children: React.ReactNode
}

const Tab = ({ id, title, children }: ITabProps) => {
    const { activeTab, decremenTabsCount, incrementTabsCount, setTabs } =
        useContext(TabContext)

    useEffect(() => {
        incrementTabsCount()

        setTabs({
            id,
            title,
        })

        return () => {
            decremenTabsCount()
        }
    }, [])

    return (
        <>
            <div
                style={{ display: `${activeTab === id ? '' : 'none'}` }}
                className='w-full'
            >
                {children}
            </div>
        </>
    )
}

Tabs.Tab = memo(Tab)

export default Tabs
