import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });


 test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  });

  test('no duplicate task', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', { name: /Add/i });
    const dueDate = "05/30/2023";
  
    fireEvent.change(inputTask, { target: { value: "History Test" } });
    fireEvent.change(inputDate, { target: { value: dueDate } });
    fireEvent.click(element);

    fireEvent.change(inputTask, { target: { value: "History Test" } });
    fireEvent.change(inputDate, { target: { value: dueDate } });
    fireEvent.click(element);
  
    const tasks = screen.getAllByText(/History Test/i);
    expect(tasks.length).toBe(1); 
  });
  
  test('submit task with no due date', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
    const element = screen.getByRole('button', { name: /Add/i });
  
    fireEvent.change(inputTask, { target: { value: "No Due Date Task" } });
    fireEvent.click(element);
  
    const check = screen.queryByText(/No Due Date Task/i);
    expect(check).not.toBeInTheDocument(); 
  });
  
  test('submit task with no task name', () => {
    render(<App />);
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', { name: /Add/i });
    const dueDate = "05/30/2023";
  
    fireEvent.change(inputDate, { target: { value: dueDate } });
    fireEvent.click(element);
  
    const check = screen.queryByText(new RegExp(dueDate, "i"));
    expect(check).not.toBeInTheDocument(); 
  });
  
  test('late tasks have different colors', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', { name: /Add/i });
    const pastDueDate = "12/30/2020";
  
    fireEvent.change(inputTask, { target: { value: "Late Task" } });
    fireEvent.change(inputDate, { target: { value: pastDueDate } });
    fireEvent.click(element);
  
    const lateTask = screen.getByTestId(/Late Task/i);
    expect(lateTask).toHaveStyle('background-color: #ffcccc'); 
  });
  
  test('delete task', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', { name: /Add/i });
    const dueDate = "12/30/2023";
  
    fireEvent.change(inputTask, { target: { value: "Task to be deleted" } });
    fireEvent.change(inputDate, { target: { value: dueDate } });
    fireEvent.click(element);
  
    const deleteCheckbox = screen.getByRole('checkbox');
    fireEvent.click(deleteCheckbox);
  
    const deletedTask = screen.queryByText(/Task to be deleted/i);
    expect(deletedTask).not.toBeInTheDocument();
  });
  
 