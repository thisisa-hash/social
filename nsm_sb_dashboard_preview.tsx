import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

const BettingDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [selectedBetType, setSelectedBetType] = useState('All');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedLeague, setSelectedLeague] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [selectedVIP, setSelectedVIP] = useState('All');
  const [selectedPlayerType, setSelectedPlayerType] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedWeeks, setSelectedWeeks] = useState(['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']);
  const [selectedMonths, setSelectedMonths] = useState(['M1', 'M2']);
  const [activeTab, setActiveTab] = useState('engagement');
  const [distributionMetric, setDistributionMetric] = useState('Bets');
  const [leftChartView, setLeftChartView] = useState('Product');
  const [nsmMetric, setNsmMetric] = useState('Bets per Bettor');
  const [turnoverLevel, setTurnoverLevel] = useState('Bet');
  const [ggrLevel, setGgrLevel] = useState('Bet');
  const [ngrLevel, setNgrLevel] = useState('Bet');

  const xAxisLine = { dataKey: "week", tick: { fontSize: 12 }, padding: { left: 30, right: 30 } };
  const xAxisBar  = { dataKey: "week", tick: { fontSize: 12 } };

  const weekData = [
    { week: 'Week 1', weekId: 'W1', bets: 18500, turnover: 245000, ggr: 45000, ngr: 38000, stake: 220000, acceptedBets: 17200, totalBets: 18500, activeBettors: 3200, single: 8500, acca: 4200, betBuilder: 2800, betBuilderCombo: 1500, system: 1500, singleStake: 95000, accaStake: 62000, betBuilderStake: 38000, betBuilderComboStake: 15000, systemStake: 10000, leg1: 8500, leg2: 3200, leg3_5: 4100, leg6_10: 1800, leg10plus: 900, avgSelections: 3.2 },
    { week: 'Week 2', weekId: 'W2', bets: 22300, turnover: 312000, ggr: 58000, ngr: 49500, stake: 285000, acceptedBets: 21100, totalBets: 22300, activeBettors: 3800, single: 10200, acca: 5100, betBuilder: 3400, betBuilderCombo: 1800, system: 1800, singleStake: 118000, accaStake: 75000, betBuilderStake: 46000, betBuilderComboStake: 18000, systemStake: 28000, leg1: 10200, leg2: 3900, leg3_5: 4900, leg6_10: 2200, leg10plus: 1100, avgSelections: 3.4 },
    { week: 'Week 3', weekId: 'W3', bets: 19800, turnover: 268000, ggr: 51000, ngr: 43200, stake: 248000, acceptedBets: 18900, totalBets: 19800, activeBettors: 3450, single: 9100, acca: 4500, betBuilder: 3000, betBuilderCombo: 1600, system: 1600, singleStake: 102000, accaStake: 65000, betBuilderStake: 41000, betBuilderComboStake: 16000, systemStake: 24000, leg1: 9100, leg2: 3400, leg3_5: 4300, leg6_10: 2000, leg10plus: 1000, avgSelections: 3.3 },
    { week: 'Week 4', weekId: 'W4', bets: 21500, turnover: 295000, ggr: 55500, ngr: 47000, stake: 272000, acceptedBets: 20400, totalBets: 21500, activeBettors: 3650, single: 9800, acca: 4900, betBuilder: 3300, betBuilderCombo: 1700, system: 1800, singleStake: 112000, accaStake: 70000, betBuilderStake: 44000, betBuilderComboStake: 17000, systemStake: 29000, leg1: 9800, leg2: 3700, leg3_5: 4700, leg6_10: 2100, leg10plus: 1200, avgSelections: 3.5 },
    { week: 'Week 5', weekId: 'W5', bets: 20100, turnover: 278000, ggr: 52800, ngr: 44500, stake: 258000, acceptedBets: 19200, totalBets: 20100, activeBettors: 3500, single: 9200, acca: 4600, betBuilder: 3100, betBuilderCombo: 1600, system: 1600, singleStake: 106000, accaStake: 67000, betBuilderStake: 42000, betBuilderComboStake: 16000, systemStake: 27000, leg1: 9200, leg2: 3500, leg3_5: 4400, leg6_10: 1900, leg10plus: 1100, avgSelections: 3.3 },
    { week: 'Week 6', weekId: 'W6', bets: 23400, turnover: 328000, ggr: 62000, ngr: 52500, stake: 298000, acceptedBets: 22500, totalBets: 23400, activeBettors: 3900, single: 10700, acca: 5400, betBuilder: 3600, betBuilderCombo: 1900, system: 1800, singleStake: 125000, accaStake: 79000, betBuilderStake: 49000, betBuilderComboStake: 19000, systemStake: 26000, leg1: 10700, leg2: 4100, leg3_5: 5200, leg6_10: 2300, leg10plus: 1100, avgSelections: 3.6 },
    { week: 'Week 7', weekId: 'W7', bets: 21800, turnover: 302000, ggr: 57200, ngr: 48500, stake: 278000, acceptedBets: 20900, totalBets: 21800, activeBettors: 3700, single: 10000, acca: 5000, betBuilder: 3300, betBuilderCombo: 1800, system: 1700, singleStake: 115000, accaStake: 72000, betBuilderStake: 45000, betBuilderComboStake: 18000, systemStake: 28000, leg1: 10000, leg2: 3800, leg3_5: 4800, leg6_10: 2100, leg10plus: 1100, avgSelections: 3.4 },
    { week: 'Week 8', weekId: 'W8', bets: 24200, turnover: 338000, ggr: 64500, ngr: 54800, stake: 310000, acceptedBets: 23400, totalBets: 24200, activeBettors: 4100, single: 11100, acca: 5600, betBuilder: 3700, betBuilderCombo: 2000, system: 1800, singleStake: 128000, accaStake: 82000, betBuilderStake: 51000, betBuilderComboStake: 20000, systemStake: 29000, leg1: 11100, leg2: 4200, leg3_5: 5400, leg6_10: 2400, leg10plus: 1100, avgSelections: 3.7 }
  ];

  const aggregateToMonth = (weeks, monthName) => {
    const totalBets = weeks.reduce((sum, w) => sum + w.bets, 0);
    const totalTurnover = weeks.reduce((sum, w) => sum + w.turnover, 0);
    const totalGGR = weeks.reduce((sum, w) => sum + w.ggr, 0);
    const totalNGR = weeks.reduce((sum, w) => sum + w.ngr, 0);
    const totalStake = weeks.reduce((sum, w) => sum + w.stake, 0);
    const totalBettorWeeks = weeks.reduce((sum, w) => sum + w.activeBettors, 0);
    return {
      week: monthName,
      bets: totalBets,
      turnover: totalTurnover,
      ggr: totalGGR,
      ngr: totalNGR,
      stake: totalStake,
      acceptedBets: weeks.reduce((sum, w) => sum + w.acceptedBets, 0),
      totalBets: weeks.reduce((sum, w) => sum + w.totalBets, 0),
      activeBettors: totalBettorWeeks,
      single: weeks.reduce((sum, w) => sum + w.single, 0),
      acca: weeks.reduce((sum, w) => sum + w.acca, 0),
      betBuilder: weeks.reduce((sum, w) => sum + w.betBuilder, 0),
      betBuilderCombo: weeks.reduce((sum, w) => sum + w.betBuilderCombo, 0),
      system: weeks.reduce((sum, w) => sum + w.system, 0),
      singleStake: weeks.reduce((sum, w) => sum + w.singleStake, 0),
      accaStake: weeks.reduce((sum, w) => sum + w.accaStake, 0),
      betBuilderStake: weeks.reduce((sum, w) => sum + w.betBuilderStake, 0),
      betBuilderComboStake: weeks.reduce((sum, w) => sum + w.betBuilderComboStake, 0),
      systemStake: weeks.reduce((sum, w) => sum + w.systemStake, 0),
      leg1: weeks.reduce((sum, w) => sum + w.leg1, 0),
      leg2: weeks.reduce((sum, w) => sum + w.leg2, 0),
      leg3_5: weeks.reduce((sum, w) => sum + w.leg3_5, 0),
      leg6_10: weeks.reduce((sum, w) => sum + w.leg6_10, 0),
      leg10plus: weeks.reduce((sum, w) => sum + w.leg10plus, 0),
      avgSelections: weeks.reduce((sum, w) => sum + w.avgSelections * w.bets, 0) / totalBets
    };
  };

  const getDisplayData = () => {
    if (selectedPeriod === 'Week') {
      return weekData.filter(w => selectedWeeks.includes(w.weekId));
    } else {
      const result = [];
      if (selectedMonths.includes('M1')) result.push(aggregateToMonth(weekData.slice(0, 4), 'Month 1'));
      if (selectedMonths.includes('M2')) result.push(aggregateToMonth(weekData.slice(4, 8), 'Month 2'));
      return result;
    }
  };

  const displayData = getDisplayData();

  const cohortData = [
    { cohort: 'Week 1', week1: 100, week2: 82, week3: 71, week4: 65, week5: 58, week6: 53, week7: 48, week8: 44 },
    { cohort: 'Week 2', week1: null, week2: 100, week3: 85, week4: 74, week5: 67, week6: 61, week7: 55, week8: 50 },
    { cohort: 'Week 3', week1: null, week2: null, week3: 100, week4: 78, week5: 69, week6: 63, week7: 57, week8: 52 },
    { cohort: 'Week 4', week1: null, week2: null, week3: null, week4: 100, week5: 81, week6: 72, week7: 66, week8: 60 },
    { cohort: 'Week 5', week1: null, week2: null, week3: null, week4: null, week5: 100, week6: 84, week7: 75, week8: 68 },
    { cohort: 'Week 6', week1: null, week2: null, week3: null, week4: null, week5: null, week6: 100, week7: 79, week8: 71 },
    { cohort: 'Week 7', week1: null, week2: null, week3: null, week4: null, week5: null, week6: null, week7: 100, week8: 83 },
    { cohort: 'Week 8', week1: null, week2: null, week3: null, week4: null, week5: null, week6: null, week7: null, week8: 100 }
  ];

  const monthlyCohortData = [
    { cohort: 'Month 1', month1: 100, month2: 65, month3: 51, month4: 42 },
    { cohort: 'Month 2', month1: null, month2: 100, month3: 68, month4: 54 },
    { cohort: 'Month 3', month1: null, month2: null, month3: 100, month4: 71 },
    { cohort: 'Month 4', month1: null, month2: null, month3: null, month4: 100 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
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

  const CohortLegend = () => (
    <div className="mt-6 flex items-center gap-6 flex-wrap">
      <span className="text-sm font-medium text-gray-700">Legend:</span>
      {[['bg-emerald-700','≥70%'],['bg-teal-500','50-69%'],['bg-yellow-400','40-49%'],['bg-orange-400','20-39%'],['bg-red-700','<20%']].map(([bg, label]) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-6 h-6 ${bg} rounded`}></div>
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );

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

      {[
        { label: 'Country', value: selectedCountry, setter: setSelectedCountry, options: ['All','Greece','Brazil','Mexico'] },
        { label: 'Product', value: selectedProduct, setter: setSelectedProduct, options: ['All','Pre Live','Live'] },
        { label: 'Bet Type', value: selectedBetType, setter: setSelectedBetType, options: ['All','Single','Acca','Bet Builder','Bet Builder Combo','System'] }
      ].map((f, i) => (
        <div key={i} className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">{f.label}</label>
          <select value={f.value} onChange={(e) => f.setter(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      ))}

      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">Sport</label>
        <select value={selectedSport} onChange={(e) => { setSelectedSport(e.target.value); setSelectedLeague('All'); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>Football</option><option>Basketball</option><option>Tennis</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">League</label>
        <select value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)} disabled={selectedSport === 'All'} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100">
          <option value="All">All</option>
          {selectedSport === 'Football' && <><option>Champions League</option><option>Premier League</option><option>Primera Division</option></>}
          {selectedSport === 'Basketball' && <><option>Euroleague</option><option>NBA</option><option>Greek League</option></>}
          {selectedSport === 'Tennis' && <><option>Roland Garros</option><option>US Open</option></>}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">Market</label>
        <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>Core Outcome Markets</option><option>Player Centric Markets</option><option>Secondary Match Events</option><option>Advanced Match Events</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">VIP</label>
        <select value={selectedVIP} onChange={(e) => setSelectedVIP(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>VIP Only</option><option>Non-VIP</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">Player Type</label>
        <select value={selectedPlayerType} onChange={(e) => setSelectedPlayerType(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>SB</option><option>CA</option><option>SB & CA</option><option>UR</option><option>Bonus Abuser</option><option>UNDEFINED</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-600 mb-1 block">Device</label>
        <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option>All</option><option>Mobile</option><option>Desktop</option><option>Tablet</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="flex gap-6">
        <FilterSidebar />
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">NSM SB Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Performance Overview — {selectedPeriod} Level</p>
            <div className="flex gap-1 mt-4 border-b border-gray-200">
              {['engagement','financial','cohorts'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}>
                  {tab === 'engagement' ? 'Executive Overview' : tab === 'financial' ? 'Financial Metrics' : 'Cohorts'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'engagement' && (
            <>
              {/* NSM Chart */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {nsmMetric === 'Bets per Bettor' ? 'NSM — Bets Placed per Bettor' : 'Bets Placed & Bettors'}
                  </h2>
                  <select value={nsmMetric} onChange={(e) => setNsmMetric(e.target.value)} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="Bets per Bettor">Bets Placed per Bettor</option>
                    <option value="Total Bets">Bets Placed & Bettors</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  {nsmMetric === 'Bets per Bettor' ? (
                    <BarChart data={displayData.map(w => ({ week: w.week, betsPerBettor: +(w.bets / w.activeBettors).toFixed(2) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisBar} />
                      <YAxis tick={{ fontSize: 12 }} label={{ value: selectedPeriod === 'Week' ? 'Bets per Bettor' : 'Bets per Bettor-Week', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="betsPerBettor" fill="#29A8AC" name={selectedPeriod === 'Week' ? 'Bets per Bettor' : 'Bets per Bettor-Week'} radius={[4,4,0,0]} />
                    </BarChart>
                  ) : (
                    <ComposedChart data={displayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: 'Total Bets Placed', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: selectedPeriod === 'Week' ? 'Bettors' : 'Bettor-Weeks', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="bets" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="Total Bets Placed" />
                      <Line yAxisId="right" type="monotone" dataKey="activeBettors" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name={selectedPeriod === 'Week' ? 'Bettors' : 'Bettor-Weeks'} />
                    </ComposedChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Distribution Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">{leftChartView === 'Product' ? 'Product Distribution' : 'Bet Type Distribution'}</h3>
                      <div className="flex gap-2">
                        {['Product','Bet Type'].map(v => (
                          <button key={v} onClick={() => setLeftChartView(v)}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${leftChartView === v ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <select value={distributionMetric} onChange={(e) => setDistributionMetric(e.target.value)} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="Bets">Bet Placements</option>
                      <option value="Stake">Stake</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    {leftChartView === 'Product' ? (
                      <BarChart data={displayData.map(w => ({ week: w.week, 'Pre Live': distributionMetric === 'Bets' ? w.bets * 0.65 : w.stake * 0.65, 'Live': distributionMetric === 'Bets' ? w.bets * 0.35 : w.stake * 0.35 }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis {...xAxisBar} />
                        <YAxis tick={{ fontSize: 12 }} label={{ value: distributionMetric === 'Bets' ? '# of Bets' : 'Stake (€)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="Pre Live" stackId="a" fill="#29A8AC" />
                        <Bar dataKey="Live" stackId="a" fill="#F3CA3E" />
                      </BarChart>
                    ) : (
                      <BarChart data={displayData.map(w => ({ week: w.week, Single: distributionMetric === 'Bets' ? w.single : w.singleStake, Acca: distributionMetric === 'Bets' ? w.acca : w.accaStake, 'Bet Builder': distributionMetric === 'Bets' ? w.betBuilder : w.betBuilderStake, 'BB Combo': distributionMetric === 'Bets' ? w.betBuilderCombo : w.betBuilderComboStake, System: distributionMetric === 'Bets' ? w.system : w.systemStake }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis {...xAxisBar} />
                        <YAxis tick={{ fontSize: 12 }} label={{ value: distributionMetric === 'Bets' ? '# of Bets' : 'Stake (€)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="Single" stackId="a" fill="#29A8AC" />
                        <Bar dataKey="Acca" stackId="a" fill="#F3CA3E" />
                        <Bar dataKey="Bet Builder" stackId="a" fill="#2AC940" />
                        <Bar dataKey="BB Combo" stackId="a" fill="#FF6B6B" />
                        <Bar dataKey="System" stackId="a" fill="#9B59B6" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>

                {/* Legs Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Legs Distribution</h3>
                  {selectedBetType === 'Single' ? (
                    <div className="h-[350px] flex items-center justify-center text-gray-500">No leg data for Single bets</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={displayData.map(w => {
                        const d = selectedBetType === 'Acca'
                          ? { '1 Leg': 0, '2 Legs': w.leg2*0.4, '3-5 Legs': w.leg3_5*0.5, '6-10 Legs': w.leg6_10*0.4, '10+ Legs': w.leg10plus*0.3 }
                          : selectedBetType === 'Bet Builder'
                          ? { '1 Leg': 0, '2 Legs': w.leg2*0.3, '3-5 Legs': w.leg3_5*0.3, '6-10 Legs': w.leg6_10*0.3, '10+ Legs': w.leg10plus*0.2 }
                          : selectedBetType === 'Bet Builder Combo'
                          ? { '1 Leg': 0, '2 Legs': w.leg2*0.2, '3-5 Legs': w.leg3_5*0.15, '6-10 Legs': w.leg6_10*0.2, '10+ Legs': w.leg10plus*0.3 }
                          : selectedBetType === 'System'
                          ? { '1 Leg': 0, '2 Legs': w.leg2*0.1, '3-5 Legs': w.leg3_5*0.05, '6-10 Legs': w.leg6_10*0.1, '10+ Legs': w.leg10plus*0.2 }
                          : { '1 Leg': w.leg1, '2 Legs': w.leg2, '3-5 Legs': w.leg3_5, '6-10 Legs': w.leg6_10, '10+ Legs': w.leg10plus };
                        return { week: w.week, ...d, avgSelections: w.avgSelections };
                      })}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis {...xAxisBar} />
                        <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: '# of Bets', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'Avg Selections', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="1 Leg" stackId="a" fill="#29A8AC" />
                        <Bar yAxisId="left" dataKey="2 Legs" stackId="a" fill="#F3CA3E" />
                        <Bar yAxisId="left" dataKey="3-5 Legs" stackId="a" fill="#2AC940" />
                        <Bar yAxisId="left" dataKey="6-10 Legs" stackId="a" fill="#FF6B6B" />
                        <Bar yAxisId="left" dataKey="10+ Legs" stackId="a" fill="#9B59B6" />
                        <Line yAxisId="right" type="monotone" dataKey="avgSelections" stroke="#E74C3C" strokeWidth={3} dot={{ fill: '#E74C3C', r: 5 }} name="Avg Selections per Bet" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'cohorts' && (
            <div className="space-y-6">

              {/* Weekly Cohort */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Bet Placement Cohort Analysis (Week)</h2>
                  <p className="text-sm text-gray-500 mt-1">% of bettors from each weekly cohort who placed at least 1 bet in subsequent weeks</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-700">Cohort</th>
                        {[1,2,3,4,5,6,7,8].map(w => (
                          <th key={w} className="border border-gray-300 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-700">Week {w}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cohortData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">{row.cohort}</td>
                          {[1,2,3,4,5,6,7,8].map(w => {
                            const val = row[`week${w}`];
                            const bg = val === null ? 'bg-gray-100' : val >= 70 ? 'bg-emerald-700' : val >= 50 ? 'bg-teal-500' : val >= 40 ? 'bg-yellow-400' : val >= 20 ? 'bg-orange-400' : 'bg-red-700';
                            const txt = val === null ? 'text-gray-400' : val >= 40 && val < 50 ? 'text-gray-800' : 'text-white';
                            return (
                              <td key={w} className={`border border-gray-300 px-4 py-3 text-center text-sm font-semibold ${bg} ${txt}`}>
                                {val !== null ? `${val}%` : ''}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CohortLegend />
              </div>

              {/* Monthly Cohort */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Bet Placement Cohort Analysis (Month)</h2>
                  <p className="text-sm text-gray-500 mt-1">% of bettors from each monthly cohort who placed at least 1 bet in subsequent months</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-700">Cohort</th>
                        {[1,2,3,4].map(m => (
                          <th key={m} className="border border-gray-300 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-700">Month {m}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyCohortData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">{row.cohort}</td>
                          {[1,2,3,4].map(m => {
                            const val = row[`month${m}`];
                            const bg = val === null ? 'bg-gray-100' : val >= 70 ? 'bg-emerald-700' : val >= 50 ? 'bg-teal-500' : val >= 40 ? 'bg-yellow-400' : val >= 20 ? 'bg-orange-400' : 'bg-red-700';
                            const txt = val === null ? 'text-gray-400' : val >= 40 && val < 50 ? 'text-gray-800' : 'text-white';
                            return (
                              <td key={m} className={`border border-gray-300 px-4 py-3 text-center text-sm font-semibold ${bg} ${txt}`}>
                                {val !== null ? `${val}%` : ''}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CohortLegend />
              </div>

            </div>
          )}

          {activeTab === 'financial' && (
            <>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Turnover */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Turnover vs Turnover per {turnoverLevel}</h3>
                    <select value={turnoverLevel} onChange={(e) => setTurnoverLevel(e.target.value)} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="Bet">Per Bet</option>
                      <option value="Bettor">Per Bettor</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={displayData.map(w => ({ week: w.week, total: w.turnover/1000, perLevel: w.turnover/(turnoverLevel === 'Bet' ? w.bets : w.activeBettors) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: `Turnover per ${turnoverLevel} (€)`, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'Turnover (K€)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="perLevel" stroke="#29A8AC" strokeWidth={3} dot={{ fill: '#29A8AC', r: 5 }} name={`Turnover per ${turnoverLevel}`} />
                      <Line yAxisId="right" type="monotone" dataKey="total" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Turnover (K€)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* GGR */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">GGR vs GGR per {ggrLevel}</h3>
                    <select value={ggrLevel} onChange={(e) => setGgrLevel(e.target.value)} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="Bet">Per Bet</option>
                      <option value="Bettor">Per Bettor</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={displayData.map(w => ({ week: w.week, total: w.ggr/1000, perLevel: w.ggr/(ggrLevel === 'Bet' ? w.bets : w.activeBettors) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: `GGR per ${ggrLevel} (€)`, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'GGR (K€)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="perLevel" stroke="#29A8AC" strokeWidth={3} dot={{ fill: '#29A8AC', r: 5 }} name={`GGR per ${ggrLevel}`} />
                      <Line yAxisId="right" type="monotone" dataKey="total" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="GGR (K€)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* NGR */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">NGR vs NGR per {ngrLevel}</h3>
                    <select value={ngrLevel} onChange={(e) => setNgrLevel(e.target.value)} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="Bet">Per Bet</option>
                      <option value="Bettor">Per Bettor</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={displayData.map(w => ({ week: w.week, total: w.ngr/1000, perLevel: w.ngr/(ngrLevel === 'Bet' ? w.bets : w.activeBettors) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: `NGR per ${ngrLevel} (€)`, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'NGR (K€)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="perLevel" stroke="#29A8AC" strokeWidth={3} dot={{ fill: '#29A8AC', r: 5 }} name={`NGR per ${ngrLevel}`} />
                      <Line yAxisId="right" type="monotone" dataKey="total" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="NGR (K€)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Margin */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Margin (Turnover vs GGR)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={displayData.map(w => ({ week: w.week, turnover: w.turnover/1000, ggr: w.ggr/1000, marginPercent: (w.ggr/w.turnover)*100 }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis {...xAxisLine} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: 'Margin %', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'Revenue (K€)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="marginPercent" fill="#29A8AC" name="Margin %" radius={[4,4,0,0]} />
                      <Line yAxisId="right" type="monotone" dataKey="turnover" stroke="#F3CA3E" strokeWidth={3} dot={{ fill: '#F3CA3E', r: 5 }} name="Turnover (K€)" />
                      <Line yAxisId="right" type="monotone" dataKey="ggr" stroke="#2AC940" strokeWidth={3} dot={{ fill: '#2AC940', r: 5 }} name="GGR (K€)" />
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

export default BettingDashboard;
