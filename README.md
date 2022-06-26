
~~~jsx
import {Tabs} from "components/Tabs"
const { Tab } = Tabs;

<Tabs defaultActiveTab={1} onTabChange={(idx) => onTabChange(idx)}>
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
~~~