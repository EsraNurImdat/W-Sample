import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './LoginPage';

test('renders login page', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByText('Sign in')).toBeInTheDocument();
  expect(screen.getByLabelText('User Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
});

test('allows user to fill in form fields', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const usernameInput = screen.getByLabelText('User Name');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  expect(usernameInput).toHaveValue('testuser');
  expect(passwordInput).toHaveValue('testpassword');
});

test('submits form with correct data', async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const usernameInput = screen.getByLabelText('User Name');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Sign In' });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Searching Screen')).toBeInTheDocument();
  });
});


/*
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';

test('renders register page', () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  expect(screen.getByText('Register')).toBeInTheDocument();
  expect(screen.getByLabelText('First Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  expect(screen.getByLabelText('User Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
});

test('allows user to fill in form fields', () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const firstNameInput = screen.getByLabelText('First Name');
  const lastNameInput = screen.getByLabelText('Last Name');
  const usernameInput = screen.getByLabelText('User Name');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(firstNameInput).toHaveValue('John');
  expect(lastNameInput).toHaveValue('Doe');
  expect(usernameInput).toHaveValue('johndoe');
  expect(passwordInput).toHaveValue('password123');
});

test('submits form with correct data', async () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const submitButton = screen.getByRole('button', { name: 'Register' });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Successfully Registered!')).toBeInTheDocument();
  });
});
*/
/*

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ResultTable from './ResultTable';

const server = setupServer(
  rest.post('http://localhost:5000/saveProject', (req, res, ctx) => {
    // Check if the received data contains today's date
    const requestBody = JSON.parse(req.body);
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const expectedDate = `${month}-${day}-${year}`;

    if (requestBody.date === expectedDate) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400), ctx.json({ message: 'Invalid date' }));
    }
  })
);

// Setup server before tests and clean up after tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('saves project with today\'s date when save button is clicked', async () => {
  render(<ResultTable />);

 
  fireEvent.change(screen.getByLabelText('Project Name'), { target: { value: 'Test Project' } });


  fireEvent.click(screen.getByRole('button', { name: 'Save Project' }));

  await waitFor(() => {
    expect(screen.getByText('Projects saved!')).toBeInTheDocument();
  });


  expect(server.handlers[0].response.body.date).toMatch(/(\d{1,2})-(\d{1,2})-(\d{4})/);
});
*/

/*
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import ResultTable from './ResultTable';

test('renders download CSV button', () => {
  render(
    <Router>
      <ResultTable />
    </Router>
  );

  const downloadButton = screen.getByRole('button', { name: 'Download CSV' });

  expect(downloadButton).toBeInTheDocument();
});

test('download CSV button has correct attributes', () => {
  render(
    <Router>
      <ResultTable />
    </Router>
  );

  const downloadButton = screen.getByRole('button', { name: 'Download CSV' });

  expect(downloadButton).toHaveAttribute('variant', 'contained');
  expect(downloadButton).toHaveAttribute('size', 'small');

  const csvLink = screen.getByTestId('csv-link');

  expect(csvLink).toHaveAttribute('data-testid', 'csv-link');
  expect(csvLink).toHaveAttribute('data-testid', 'csv-link');
});
*/
/*
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ProjectTable from './ProjectTable';
import axios from 'axios';

jest.mock('axios');

test('edit project name', async () => {
  const responseData = { message: 'Project name updated successfully' };
  axios.post.mockResolvedValue({ data: responseData });

  render(<ProjectTable />);

  const editButton = screen.getByRole('button', { name: /edit/i });
  userEvent.click(editButton);

  const editDialog = screen.getByRole('dialog');
  const editInput = within(editDialog).getByLabelText(/project name/i);
  fireEvent.change(editInput, { target: { value: 'New Project Name' } });

  const saveButton = within(editDialog).getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/editProject', { pId: expect.any(Number), pName: 'New Project Name' });

    const successAlert = screen.getByRole('alert', { name: /projects saved/i });
    expect(successAlert).toBeInTheDocument();
  });
});
*/


/*
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ProjectTable from './ProjectTable';
import axios from 'axios';

jest.mock('axios');

test('delete project', async () => {
  const responseData = { message: 'Project deleted successfully' };
  axios.post.mockResolvedValue({ data: responseData });

  render(<ProjectTable />);

  const projectNameToDelete = 'Project to delete';
  const deleteButton = screen.getByRole('button', { name: /delete/i, hidden: true });
  fireEvent.click(deleteButton);


  const confirmButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/deleteProject', { delId: expect.any(Number) });

    const successAlert = screen.getByRole('alert', { name: /project deleted/i });
    expect(successAlert).toBeInTheDocument();


    expect(screen.queryByText(projectNameToDelete)).not.toBeInTheDocument();
  });
});

*/

/*

import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

test('responsive design adaptation', async () => {
  // Test if the responsive design adapts appropriately by changing the screen size

  // Set viewport representing a small screen size
  global.innerWidth = 480;
  global.innerHeight = 640;
  // Trigger window resize event
  fireEvent(window, new Event('resize'));

  // Check the main title text, it should fit on the screen
  const title = screen.getByText('W-SAMPLE');
  expect(title).toBeInTheDocument();

  // Set viewport representing a large screen size
  global.innerWidth = 1920;
  global.innerHeight = 1080;
  // Trigger window resize event
  fireEvent(window, new Event('resize'));

  // Check the main title text, it should fit on the screen
  const title = screen.getByText('W-SAMPLE');
  expect(title).toBeInTheDocument();
});

test('UI element accessibility and functionality', async () => {
  render(<Home />);

  // Check the existence and content of the Navbar
  const navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();

  // Check the existence and content of the search button
  const searchButton = screen.getByRole('button', { name: /search/i });
  expect(searchButton).toBeInTheDocument();

  // Click the search button and check the search input
  fireEvent.click(searchButton);
  const searchInput = screen.getByRole('textbox', { name: /search/i });
  expect(searchInput).toBeInTheDocument();
});

*/