import React from "react";

export default function PricingPlans() {
  const stripeKey =
    "pk_live_51RgslBIoLBky1e4szfjsLuTitPWe5B4YEYy4E2eEqIvFrwa4Ppl0j1RqzTiCew8GZKq2xmsmawwkpas25b98m1Cj00nPZ0H4I2";

  const handleCheckout = (plan) => {
    const urls = {
      premium: "https://buy.stripe.com/8x2eVd27naqS6vs0OLaVa02", // $50 plan
      plus: "https://buy.stripe.com/8x2eVd27naqS6vs0OLaVa02", // $100 plan placeholder
      family: "https://buy.stripe.com/8x2eVd27naqS6vs0OLaVa02", // $50 family plan
    };
    window.location.href = urls[plan];
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💳 Choose Your Learnova Plan</h2>
      <p style={styles.subtitle}>
        All plans include 24/7 tutoring with Shira & Shaima AI, personalized learning paths, and parental tracking.
      </p>

      <div style={styles.planContainer}>
        {/* Premium Plan */}
        <div style={styles.card}>
          <h3 style={styles.planTitle}>⭐ Premium</h3>
          <p style={styles.price}>$50/month</p>
          <ul style={styles.features}>
            <li>All subjects access</li>
            <li>AI Tutor (Shira & Shaima)</li>
            <li>Weekly performance reports</li>
            <li>1 student account</li>
          </ul>
          <button style={styles.btn} onClick={() => handleCheckout("premium")}>
            Subscribe with Stripe
          </button>
        </div>

        {/* Learnova Plus */}
        <div style={{ ...styles.card, border: "2px solid #0074E4" }}>
          <h3 style={styles.planTitle}>🚀 Learnova Plus</h3>
          <p style={styles.price}>$100/month</p>
          <ul style={styles.features}>
            <li>Everything in Premium</li>
            <li>Unlimited quizzes</li>
            <li>Parent Dashboard + Insights</li>
            <li>Priority AI Tutor Access</li>
          </ul>
          <button style={styles.btn} onClick={() => handleCheckout("plus")}>
            Upgrade with Stripe
          </button>
        </div>

        {/* Family Plan */}
        <div style={styles.card}>
          <h3 style={styles.planTitle}>👨‍👩‍👧 Family Plan</h3>
          <p style={styles.price}>$50/month (2 students)</p>
          <ul style={styles.features}>
            <li>2 students included</li>
            <li>+ $25 per extra student</li>
            <li>Shared family progress tracking</li>
            <li>All subjects + Shira Tutor</li>
          </ul>
          <button style={styles.btn} onClick={() => handleCheckout("family")}>
            Subscribe with Stripe
          </button>
        </div>
      </div>

      <div style={styles.footerNote}>
        <p>
          Payments are securely processed via Stripe. You can cancel or change your plan anytime.
        </p>
        <small>Powered by Shira AI · Secure Global Payments 🌍</small>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1000,
    margin: "3rem auto",
    padding: "2rem",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    color: "#003366",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#555",
    marginBottom: "2rem",
  },
  planContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "center",
  },
  card: {
    width: "280px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    textAlign: "center",
  },
  planTitle: {
    color: "#003366",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  price: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#0074E4",
    marginBottom: "1rem",
  },
  features: {
    listStyle: "none",
    textAlign: "left",
    padding: 0,
    marginBottom: "1.5rem",
    lineHeight: 1.6,
  },
  btn: {
    background: "#0074E4",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  footerNote: {
    marginTop: "2rem",
    color: "#666",
    fontSize: "0.9rem",
  },
}
