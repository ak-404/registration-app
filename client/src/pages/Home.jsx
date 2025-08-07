import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Basti Ki Pathshala Foundation</h1>
          <p className="hero-subtitle">Lighting the Path to Change Through Education</p>
          <Link to="/register" className="cta-button">
            Join Our Mission
          </Link>
        </div>
      </div>

      <div className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>About Our Foundation</h2>
            <div className="about-text">
              <p>
                At Basti Ki Pathshala Foundation, we are more than just an organization – we are a movement,
                driven by the belief that education is the cornerstone of empowerment. Established under the
                Indian Societies Act of 1860, we stand as a beacon of hope in underserved communities,
                dedicated to breaking the chains of poverty through the transformative power of learning.
              </p>
              <p>
                Our mission extends beyond traditional education. We create opportunities, build bridges of
                understanding, and foster an environment where every child, regardless of their background,
                can access quality education and develop the skills needed to succeed in life.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="opportunities-section">
        <div className="container">
          <h2>Get Involved</h2>
          <div className="opportunities-grid">
            <div className="opportunity-card">
              <div className="card-icon">🎓</div>
              <h3>Become an Intern</h3>
              <p>
                Gain valuable experience while contributing to meaningful educational initiatives. 
                Perfect for students and recent graduates looking to make a difference.
              </p>
              <ul>
                <li>Work directly with educational programs</li>
                <li>Mentorship from experienced professionals</li>
                <li>Certificate of completion</li>
                <li>Skill development opportunities</li>
              </ul>
            </div>
            
            <div className="opportunity-card">
              <div className="card-icon">🤝</div>
              <h3>Volunteer With Us</h3>
              <p>
                Share your skills, time, and passion to help us reach more children and communities. 
                Every contribution makes a lasting impact.
              </p>
              <ul>
                <li>Flexible time commitments</li>
                <li>Various skill-based opportunities</li>
                <li>Community building activities</li>
                <li>Personal fulfillment and growth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="impact-section">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Children Educated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Communities Reached</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Volunteers & Interns</div>
            </div>
          </div>
        </div>
      </div>

      <div className="call-to-action-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Join us in our quest to rewrite the narrative of education, one success story at a time.
              Together, let's build a world where every child has the opportunity to dream, to learn, and
              to soar.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary">
                Apply Now
              </Link>
              <a href="mailto:info@bastikipathshala.org" className="cta-button secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
