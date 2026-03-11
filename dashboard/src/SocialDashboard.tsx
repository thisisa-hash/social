import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

const SocialDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedVIP, setSelectedVIP] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedWeeks, setSelectedWeeks] = useState(['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']);
  const [selectedMonths, setSelectedMonths] = useState(['M1', 'M2']);
  const [activeTab, setActiveTab] = useState('nsm');

  // Page 1 toggles
  const [nsmView, setNsmView] = useState('Conversion Rate');
  const [bottomRightView, setBottomRightView] = useState('Coverage');

  // Page 2 toggles
  const [copyShareView, setCopyShareView] = useState('Ratio');
  const [actionsView, setActionsView] = useState('All');

  const xAxisLine = { dataKey: "week", tick: { fontSize: 12 }, padding: { left: 30, right: 30 } };
  const xAxisBar  = { dataKey: "week", tick: { fontSize: 12 } };

  // ═══════════════════════════════════════════════
  // SOCIAL DATA — 8 weeks
  // ═══════════════════════════════════════════════
  const weekData = [
    { week: 'Week 1', weekId: 'W1', activeUsers: 52400, socialOnboarded: 15200, socialActive: 7800, socialVisitors: 24500, newOnboardings: 2100, sharedPosts: 5200, copies: 16600, shareActions: 5200, copyActions: 16600, connectActions: 14430, followers: 38500 },
    { week: 'Week 2', weekId: 'W2', activeUsers: 53100, socialOnboarded: 16100, socialActive: 8400, socialVisitors: 25800, newOnboardings: 2400, sharedPosts: 5800, copies: 19100, shareActions: 5800, copyActions: 19080, connectActions: 16130, followers: 42100 },
    { week: 'Week 3', weekId: 'W3', activeUsers: 54800, socialOnboarded: 17300, socialActive: 9200, socialVisitors: 27100, newOnboardings: 2800, sharedPosts: 6400, copies: 21800, shareActions: 6440, copyActions: 21810, connectActions: 18220, followers: 46200 },
    { week: 'Week 4', weekId: 'W4', activeUsers: 51200, socialOnboarded: 16800, socialActive: 8900, socialVisitors: 26200, newOnboardings: 2600, sharedPosts: 6100, copies: 20700, shareActions: 6140, copyActions: 20740, connectActions: 17360, followers: 48900 },
    { week: 'Week 5', weekId: 'W5', activeUsers: 55600, socialOnboarded: 18200, socialActive: 9800, socialVisitors: 28400, newOnboardings: 3100, sharedPosts: 7200, copies: 25200, shareActions: 7150, copyActions: 25180, connectActions: 20090, followers: 53400 },
    { week: 'Week 6', weekId: 'W6', activeUsers: 56300, socialOnboarded: 19100, socialActive: 10200, socialVisitors: 29100, newOnboardings: 3200, sharedPosts: 7600, copies: 27400, shareActions: 7650, copyActions: 27440, connectActions: 21420, followers: 57800 },
    { week: 'Week 7', weekId: 'W7', activeUsers: 57100, socialOnboarded: 20500, socialActive: 11100, socialVisitors: 30200, newOnboardings: 3500, sharedPosts: 8100, copies: 29900, shareActions: 8110, copyActions: 29880, connectActions: 23870, followers: 62500 },
    { week: 'Week 8', weekId: 'W8', activeUsers: 58200, socialOnboarded: 21300, socialActive: 11800, socialVisitors: 31500, newOnboardings: 3800, sharedPosts: 8500, copies: 32300, shareActions: 8500, copyActions: 32340, connectActions: 26200, followers: 67200 },
  ];

  const aggregateToMonth = (weeks: typeof weekData, monthName: string) => {
    const last = weeks[weeks.length - 1];
    return {
      week: monthName,
      activeUsers: last.activeUsers,
      socialOnboarded: last.socialOnboarded,
      socialActive: last.socialActive,
      socialVisitors: last.socialVisitors,
      newOnboardings: weeks.reduce((s, w) => s + w.newOnboardings, 0),
      sharedPosts: weeks.reduce((s, w) => s + w.sharedPosts, 0),
      copies: weeks.reduce((s, w) => s + w.copies, 0),
      shareActions: weeks.reduce((s, w) => s + w.shareActions, 0),
      copyActions: weeks.reduce((s, w) => s + w.copyActions, 0),
      connectActions: weeks.reduce((s, w) => s + w.connectActions, 0),
      followers: last.followers,
      weekId: '',
    };
  };

  const getDisplayData = () => {
    if (selectedPeriod === 'Week') {
      return weekData.filter(w => selectedWeeks.includes(w.weekId));
    }
    const result: typeof weekData = [];
    if (selectedMonths.includes('M1')) result.push(aggregateToMonth(weekData.slice(0, 4), 'Month 1'));
    if (selectedMonths.includes('M2')) result.push(aggregateToMonth(weekData.slice(4, 8), 'Month 2'));
    return result;
  };

  const displayData = getDisplayData();

  // ═══════════════════════════════════════════════
  // DERIVED METRICS
  // ═══════════════════════════════════════════════
  const enrichedData = displayData.map(w => ({
    ...w,
    conversionRate: +((w.socialActive / w.socialOnboarded) * 100).toFixed(1),
    coverage: +((w.socialOnboarded / w.activeUsers) * 100).toFixed(1),
    adoptionRate: +((w.socialVisitors / w.activeUsers) * 100).toFixed(1),
    copyToShare: +(w.copies / w.sharedPosts).toFixed(2),
    actionsPerUser: +((w.shareActions + w.copyActions + w.connectActions) / w.socialActive).toFixed(2),
    sharesPerUser: +(w.shareActions / w.socialActive).toFixed(2),
    copiesPerUser: +(w.copyActions / w.socialActive).toFixed(2),
    connectsPerUser: +(w.connectActions / w.socialActive).toFixed(2),
    avgFollowers: +(w.followers / w.socialVisitors).toFixed(2),
  }));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, i) => (
            <p key={i} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ═══════════════════════════════════════════════
  // FILTER SIDEBAR
  // ═══════════════════════════════════════════════
  const FilterSidebar = () => (
    <div className="w-48 bg-white rounded-lg shadow p-4 h-fit">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Filters</h3>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <label className="text-xs font-medium text-gray-600 mb-1 block">Period</label>
        <select
          value={selectedPeriod}
          onChange={(e) => {
            setSelectedPeriod(e.target.value);
            if (e.target.value === 'Week') setSelectedWeeks(['W1','W2','W3','W4','W5','W6','W7','W8']);
            else setSelectedMonths(['M1','M2']);
          }}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <label className="text-xs font-medium text-gray-600 mb-2 block">{selectedPeriod === 'Week' ? 'Week' : 'Month'}</label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {selectedPeriod === 'Week'
            ? ['W1','W2','W3','W4','W5','W6','W7','W8'].map(w => (
                <label key={w} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedWeeks.includes(w)}
                    onChange={(e) => setSelectedWeeks(e.target.checked ? [...selectedWeeks, w] : selectedWeeks.filter(x => x !== w))}
                    className="w-4 h-4 text-teal-500 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">{w}</span>
                </label>
              ))
            : ['M1','M2'].map(m => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedMonths.includes(m)}
                    onChange={(e) => setSelectedMonths(e.target.checked ? [...selectedMonths, m] : selectedMonths.filter(x => x !== m))}
                    className="w-4 h-4 text-teal-500 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">{m === 'M1' ? 'Month 1 (W1-W4)' : 'Month 2 (W5-W8)'}</span>
                </label>
              ))
          }
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">Country</label>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>Greece</option><option>Brazil</option><option>Mexico</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">VIP</label>
        <select value={selectedVIP} onChange={(e) => setSelectedVIP(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>VIP Only</option><option>Non-VIP</option>
        </select>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════
  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="flex gap-6">
        <FilterSidebar />
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">NSM Social Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Social Feature Analytics — {selectedPeriod} Level</p>
            <div className="flex gap-1 mt-4 border-b border-gray-200">
              {[
                { id: 'nsm', label: 'NSM' },
                { id: 'engagement', label: 'Engagement' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* PAGE 1: NSM                                */}
          {/* ═══════════════════════════════════════════ */}
          {activeTab === 'nsm' && (
            <>
              {/* ── TOP: NSM — Conversion Rate ── */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {nsmView === 'Conversion Rate'
                      ? 'NSM — Conversion Rate %'
                      : 'Social Active Users & Social Onboarded Visitors'}
                  </h2>
                  <select
                    value={nsmView}
                    onChange={(e) => setNsmView(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Conversion Rate">Conversion Rate %</option>
                    <option value="Components">Active Users & Onboarded</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  {nsmView === 'Conversion Rate' ? (
                    <ComposedChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisBar} />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Conversion Rate %', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Users', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="conversionRate" fill="#29A8AC" name="Conversion Rate %" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="socialOnboarded" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Social Onboarded" />
                      <Line yAxisId="right" type="monotone" dataKey="socialActive" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="Social Active Users" />
                    </ComposedChart>
                  ) : (
                    <ComposedChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis tick={{ fontSize: 12 }} label={{ value: 'Users', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="socialOnboarded" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Social Onboarded" />
                      <Line type="monotone" dataKey="socialActive" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="Social Active Users" />
                    </ComposedChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* ── BOTTOM ROW ── */}
              <div className="grid grid-cols-2 gap-6">
                {/* ── Bottom Left: Onboardings ── */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Onboardings</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisBar} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{ value: 'New Onboardings', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="newOnboardings" fill="#29A8AC" name="New Onboardings" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* ── Bottom Right: Coverage / Adoption Rate toggle ── */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {bottomRightView === 'Coverage' ? 'Coverage %' : 'Adoption Rate %'}
                    </h3>
                    <div className="flex gap-2">
                      {['Coverage', 'Adoption Rate'].map(v => (
                        <button
                          key={v}
                          onClick={() => setBottomRightView(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                            bottomRightView === v
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {bottomRightView === 'Coverage'
                      ? 'Social Onboarded / Active Users'
                      : 'Social Visitors / Active Users'}
                  </p>
                  <ResponsiveContainer width="100%" height={320}>
                    <ComposedChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisBar} />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        label={{ value: bottomRightView === 'Coverage' ? 'Coverage %' : 'Adoption Rate %', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Users', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey={bottomRightView === 'Coverage' ? 'coverage' : 'adoptionRate'}
                        fill="#29A8AC"
                        name={bottomRightView === 'Coverage' ? 'Coverage %' : 'Adoption Rate %'}
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="activeUsers"
                        stroke="#F3CA3E"
                        strokeWidth={3}
                        dot={{ fill: '#F3CA3E', r: 5 }}
                        name="Active Users"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey={bottomRightView === 'Coverage' ? 'socialOnboarded' : 'socialVisitors'}
                        stroke="#2AC940"
                        strokeWidth={3}
                        dot={{ fill: '#2AC940', r: 5 }}
                        name={bottomRightView === 'Coverage' ? 'Social Onboarded' : 'Social Visitors'}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* PAGE 2: ENGAGEMENT                         */}
          {/* ═══════════════════════════════════════════ */}
          {activeTab === 'engagement' && (
            <>
              {/* ── TOP: Copy-to-Share Ratio ── */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {copyShareView === 'Ratio'
                      ? 'Copy-to-Share Ratio'
                      : 'Shared Posts & Copies'}
                  </h2>
                  <select
                    value={copyShareView}
                    onChange={(e) => setCopyShareView(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Ratio">Copy-to-Share Ratio</option>
                    <option value="Components">Posts & Copies</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  {copyShareView === 'Ratio'
                    ? 'Copies per Shared Post — how many users copy the proposed bet from a share'
                    : 'Volume of shared posts and copies over time'}
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  {copyShareView === 'Ratio' ? (
                    <ComposedChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisBar} />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Copies per Share', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Count', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="copyToShare" fill="#29A8AC" name="Copy-to-Share Ratio" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="sharedPosts" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Shared Posts" />
                      <Line yAxisId="right" type="monotone" dataKey="copies" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="Copies" />
                    </ComposedChart>
                  ) : (
                    <ComposedChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis tick={{ fontSize: 12 }} label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="sharedPosts" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Shared Posts" />
                      <Line type="monotone" dataKey="copies" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="Copies" />
                    </ComposedChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* ── BOTTOM ROW ── */}
              <div className="grid grid-cols-2 gap-6">
                {/* ── Bottom Left: Actions per Social Active User ── */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Actions per Social Active User</h3>
                    <div className="flex gap-2">
                      {['All', 'Share', 'Copy', 'Connect'].map(v => (
                        <button
                          key={v}
                          onClick={() => setActionsView(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                            actionsView === v
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    {actionsView === 'All' ? (
                      <BarChart data={enrichedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis {...xAxisBar} />
                        <YAxis tick={{ fontSize: 12 }} label={{ value: 'Actions per User', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="sharesPerUser" stackId="a" fill="#29A8AC" name="Share" />
                        <Bar dataKey="copiesPerUser" stackId="a" fill="#F3CA3E" name="Copy" />
                        <Bar dataKey="connectsPerUser" stackId="a" fill="#2AC940" name="Connect" />
                      </BarChart>
                    ) : (
                      <BarChart
                        data={enrichedData.map(w => ({
                          week: w.week,
                          value: actionsView === 'Share' ? w.sharesPerUser
                               : actionsView === 'Copy' ? w.copiesPerUser
                               : w.connectsPerUser,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis {...xAxisBar} />
                        <YAxis tick={{ fontSize: 12 }} label={{ value: `${actionsView} per User`, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill={actionsView === 'Share' ? '#29A8AC' : actionsView === 'Copy' ? '#F3CA3E' : '#2AC940'}
                          name={`${actionsView} per User`}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>

                {/* ── Bottom Right: Avg Followers per Social Visitor ── */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Avg Followers per Social Visitor</h3>
                  <p className="text-xs text-gray-500 mb-4">Followers / Social Visitors — network depth</p>
                  <ResponsiveContainer width="100%" height={330}>
                    <ComposedChart data={enrichedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisBar} />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Avg Followers', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Count', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="avgFollowers" fill="#29A8AC" name="Avg Followers per Visitor" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="followers" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Total Followers" />
                      <Line yAxisId="right" type="monotone" dataKey="socialVisitors" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="Social Visitors" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialDashboard;
