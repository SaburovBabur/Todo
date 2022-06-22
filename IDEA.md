```jsx
<IF>
  <ELSE if={state === 'LOADING'}>Loading...</ELSE>

  <ELSE if={state === 'SUCCESS' && Array.isArray(todos)}>...</ELSE>

  <ELSE if={todos.length === 0}>+Create task</ELSE>

  <ELSE if={state === 'ERROR'}>Error</ELSE>
</IF>
```


1. Tracking loading state to show loading spinners
2. Avoid duplicate requests unless lifetime is passed
3. Optimistic Updates to feel ux feel smooth and fast
4. Do Optimistic Update, then server mutation req ? validate : rollback
