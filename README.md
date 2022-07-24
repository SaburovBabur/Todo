```jsx
import { Tabs } from 'components/Tabs'
const { Tab } = Tabs

;<Tabs defaultActiveTab={1} onTabChange={(idx) => onTabChange(idx)}>
    <Tab>
        <Tab.Title>All</Tab.Title>
        <Tab.Body>
            <TodoForm />
            <Map data={todos}>{() => <Todo />}</Map>
        </Tab.Body>
    </Tab>

    <Tab>
        <Tab.Title>Active</Tab.Title>
        <Tab.Body>
            <TodoForm />
            <Map data={todos}>{() => <Todo />}</Map>
        </Tab.Body>
    </Tab>

    <Tab>
        <Tab.Title>Completed</Tab.Title>
        <Tab.Body>
            <TodoForm />
            <Map data={todos}>{() => <Todo />}</Map>
            <Button leftIcon={<SvgTrash />}>Delete all</Button>
        </Tab.Body>
    </Tab>
</Tabs>
```

```jsx
<IF>
    <ELSE IF={state === 'LOADING'}>Loading...</ELSE>

    <ELSE if={state === 'SUCCESS' && Array.isArray(todos)}>...</ELSE>

    <ELSE if={todos.length === 0}>+Create task</ELSE>

    <ELSE if={state === 'ERROR'}>Error</ELSE>
</IF>
```

```jsx
<IF>
    <SHOW IF={state === 'LOADING'}>Loading...</SHOW>

    <SHOW IF={state === 'SUCCESS' && Array.isArray(todos)}>...</SHOW>

    <SHOW IF={todos.length === 0}>+Create task</SHOW>

    <SHOW IF={state === 'ERROR'}>Error</SHOW>
</IF>
```

1. Tracking loading state to show loading spinners
2. Avoid duplicate requests unless lifetime is passed
3. Optimistic Updates to feel ux feel smooth and fast
4. Do Optimistic Update, then server mutation req ? validate : rollback
