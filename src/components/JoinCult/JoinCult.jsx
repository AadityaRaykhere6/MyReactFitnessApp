import React from 'react';
import './JoinCult.css';

function JoinCult() {
  return (
    <section className="join-cult-section">
      <h1>Join the cult family</h1>
      <div className="card-container">
        {/* Career Card */}
        <a href="#" className="join-card career-card">
          <h3>Careers at Cult</h3>
          <img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_600,q_auto:good,f_auto,dpr_2,fl_progressive//image/test/join-the-cult/career-icons-v2.png" alt="Careers at Cult" />
          <button className="btn-tertiary">LEARN MORE</button>
        </a>
        {/* Franchise Card */}
        <a href="#" className="join-card franchise-card">
          <h3>cult.fit franchise <br /> opportunities</h3>
          <h5>Partner with the largest fitness brand in India</h5>
          <button className="btn-tertiary">LEARN MORE</button>
        </a>
      </div>
    </section>
  );
}

export default JoinCult;