import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#17A2B8', '#138496', '#0C2E4E', '#1a4d6d', '#22c1dd'];

// 2025 Tax Brackets Data
export function TaxBracketsChart() {
  const data = [
    { bracket: '$0-$11,925', single: 10, married: 10 },
    { bracket: '$11,926-$48,475', single: 12, married: 12 },
    { bracket: '$48,476-$103,350', single: 22, married: 22 },
    { bracket: '$103,351-$197,300', single: 24, married: 24 },
    { bracket: '$197,301-$250,525', single: 32, married: 32 },
    { bracket: '$250,526-$626,350', single: 35, married: 35 },
    { bracket: '$626,351+', single: 37, married: 37 },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="bracket" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis label={{ value: 'Tax Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="single" fill={COLORS[0]} name="Tax Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Capital Gains Tax Rates
export function CapitalGainsChart() {
  const data = [
    { income: '$0-$48,350', rate: 0 },
    { income: '$48,351-$533,400', rate: 15 },
    { income: '$533,401+', rate: 20 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="income" 
            angle={-25} 
            textAnchor="end" 
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis label={{ value: 'Tax Rate (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="rate" fill={COLORS[1]} name="Long-Term Capital Gains Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Section 179 Limits
export function Section179Chart() {
  const data = [
    { year: '2023', limit: 1160000, phaseout: 2890000 },
    { year: '2024', limit: 1220000, phaseout: 3050000 },
    { year: '2025', limit: 1250000, phaseout: 3130000 },
  ];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis 
            label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="limit" 
            stroke={COLORS[0]} 
            strokeWidth={3}
            name="Deduction Limit" 
          />
          <Line 
            type="monotone" 
            dataKey="phaseout" 
            stroke={COLORS[2]} 
            strokeWidth={3}
            name="Phaseout Threshold" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Tax Planning Strategies Distribution
export function TaxStrategiesChart() {
  const data = [
    { name: 'Deductions & Credits', value: 28 },
    { name: 'Income Timing', value: 22 },
    { name: 'Investment Tax', value: 20 },
    { name: 'Entity Structure', value: 18 },
    { name: 'Retirement Plans', value: 12 },
  ];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Employment Tax Calculation
export function EmploymentTaxChart() {
  const data = [
    { income: 50000, socialSecurity: 6200, medicare: 1450, total: 7650 },
    { income: 100000, socialSecurity: 12400, medicare: 2900, total: 15300 },
    { income: 176100, socialSecurity: 21835, medicare: 5107, total: 26942 },
    { income: 250000, socialSecurity: 21835, medicare: 7250, total: 29085 },
    { income: 500000, socialSecurity: 21835, medicare: 14500, total: 36335 },
  ];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="income" 
            tickFormatter={(value) => `$${(value / 1000)}k`}
          />
          <YAxis 
            label={{ value: 'Tax Amount ($)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `$${(value / 1000)}k`}
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="socialSecurity" stackId="a" fill={COLORS[0]} name="Social Security (6.2%)" />
          <Bar dataKey="medicare" stackId="a" fill={COLORS[1]} name="Medicare (2.9%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// SALT Deduction Comparison
export function SALTDeductionChart() {
  const data = [
    { category: 'Pre-2025', single: 10000, married: 10000 },
    { category: '2025 New', single: 40000, married: 40000 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis 
            label={{ value: 'Deduction Limit ($)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `$${(value / 1000)}k`}
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="single" fill={COLORS[0]} name="Maximum SALT Deduction" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
