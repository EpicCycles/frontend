import Header from './Header';
test('is displays correctly', () => {
  const user = {
    first_name: 'anna',
    last_name: 'Weaver',
    username: 'AVIW',
  };
  const application = {
    message: 'Message to be displayed',
  };
  const component = shallow(
    <Header user={user} application={application} changeRoute={jest.fn()} />,
  );
  expect(toJson(component)).toMatchSnapshot();
});
