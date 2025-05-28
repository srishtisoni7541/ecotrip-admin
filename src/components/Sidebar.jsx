
// 2. components/Sidebar.jsx
 function Sidebar() {
  return (
    <div className="w-60 bg-white shadow p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">ecotr<span className="text-green-500">i</span>p</h1>
      <nav className="space-y-4">
        {['Tours', 'Destinations', 'Testimonials', 'FAQs', 'Logout'].map(item => (
          <div key={item} className="flex items-center space-x-2 cursor-pointer hover:font-semibold">
            <span>📍</span>
            <span>{item}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;