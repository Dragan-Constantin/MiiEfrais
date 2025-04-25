import React from 'react';
import Header from '../components/Header';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord administrateur</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Étudiants</h2>
            <p className="text-3xl font-bold text-efreiblue">2,453</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Professeurs</h2>
            <p className="text-3xl font-bold text-efreiblue">127</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cours actifs</h2>
            <p className="text-3xl font-bold text-efreiblue">89</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 