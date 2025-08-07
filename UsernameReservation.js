// UsernameReservation.js

const supabaseUrl = '';
const supabaseKey = '';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('username-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get data from form
  const form = new FormData(e.target);
  const username = form.get('username');
  const email = form.get('email');
  const privacy_score = form.get('privacy_score');
  const platforms = form.getAll('platforms');
  const user_type = form.getAll('user_type');
  const feature_interest = form.getAll('feature_interest');
  const wants_testing = form.get('wants_testing');
  const extra_notes = form.get('extra_notes');

  // Validate that at least one platform is selected

  if (platforms.length === 0) {
    alert("Please select at least one platform!");
    return;  // Stop form submission
  }

  // Validate that at least one user type is selected

  if (user_type.length === 0) {
    alert("Please select at least one user type!");
    return;
  }

  // Validate that at least one feature interest is selected

  if (feature_interest.length === 0) {
    alert("Please select at least one feature!");
    return;
  }

  // Validate the testing radio button

  if (wants_testing === null) {
    alert("Please indicate whether you'd like to join early testing");
    return;
  }

  // Data to Supabase
  const { data, error } = await supabase
    .from('username_reservations')
    .insert([{
      username: username,
      email: email,
      privacy_score: privacy_score,
      platforms: platforms,
      user_type: user_type,
      feature_interest: feature_interest,
      wants_testing: wants_testing,
      extra_notes: extra_notes
    }]);

    // Error handling and success message
  if (error) {
    console.error('Error inserting username reservation:', error);
    alert('Something went wrong, please try again!');
  } else {
    alert('Username reserved successfully!');
  }
});
