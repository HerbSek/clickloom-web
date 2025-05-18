'use client';

import { useState } from 'react';
import AnalyzeHeader from '@/components/AnalyzeHeader';

export default function AnalyzePage() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const isValidUrl = url.startsWith('http://') || url.startsWith('https://');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress
      setProgress(25);

      // In a real implementation, you would call your API here
      // For now, we'll simulate the API call with a timeout
      setTimeout(() => {
        setProgress(50);

        // Simulate API response
        setTimeout(() => {
          setProgress(100);

          // Mock data similar to your Streamlit app
          const mockResults = {
            verdict: "Suspicious",
            risk_score: 6.8,
            summary: "This website appears to be a phishing attempt targeting users of a popular banking service. It contains suspicious elements designed to collect sensitive information.",
            recommendations: "Do not enter any personal information on this site. If you've already shared information, contact your bank immediately and change your passwords.",
            page_text_findings: {
              suspicious_phrases: [
                "Verify your account immediately",
                "Enter your security code",
                "Confirm your identity"
              ],
              phishing_indicators: true
            },
            script_analysis: {
              total_scripts: 12,
              external_scripts: 8,
              suspicious_domains: ["analytics-track.com", "data-collector.net"],
              minified_or_encoded: true
            },
            link_analysis: {
              total_links: 24,
              external_links: 15,
              redirect_services_used: ["bit.ly", "tinyurl.com"],
              phishing_like_links: ["secure-banklogin.com", "account-verify-now.net"]
            }
          };

          setResults(mockResults);
          setIsAnalyzing(false);
        }, 1500);
      }, 1500);

    } catch (err) {
      setError("An error occurred while analyzing the website. Please try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnalyzeHeader />

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleAnalyze} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!isValidUrl || isAnalyzing}
              className={`px-6 py-2 rounded-md font-medium ${
                isValidUrl && !isAnalyzing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? 'Analyzing...' : '🚨 Analyze Website'}
            </button>
          </div>
        </form>

        {isAnalyzing && (
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">
              {progress < 50 ? 'Fetching website data...' : 'Analyzing content...'}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {results && (
          <div className="mt-8">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Verdict</h3>
                <p className={`text-2xl font-bold ${
                  results.verdict === 'Safe' ? 'text-green-600' :
                  results.verdict === 'Suspicious' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {results.verdict}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Risk Score</h3>
                <p className={`text-2xl font-bold ${
                  results.risk_score < 3 ? 'text-green-600' :
                  results.risk_score < 7 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {results.risk_score}/10
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Suspicious Phrases</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {results.page_text_findings.suspicious_phrases.length}
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">🔍 Summary</h2>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    {results.summary}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">⚠️ Recommendations</h2>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    {results.recommendations}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">🕵️ Suspicious Phrases</h2>
                  <ul className="bg-white p-4 rounded-lg border">
                    {results.page_text_findings.suspicious_phrases.map((phrase, index) => (
                      <li key={index} className="mb-2 pb-2 border-b border-gray-100 text-gray-800">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                          🔸 Suspicious
                        </span>
                        "{phrase}"
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-4 p-3 rounded-lg ${
                    results.page_text_findings.phishing_indicators
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    <strong>Phishing Indicators:</strong> {results.page_text_findings.phishing_indicators ? 'Detected' : 'None Detected'}
                  </div>
                </div>
              </div>

              <div>
                {/* Risk Score Visualization */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Risk Score Breakdown</h2>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                          Safe
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                          Risk
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div style={{ width: `${results.risk_score * 10}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-red-500">
                        <span className="text-xs font-medium text-red-100 px-1">{results.risk_score}/10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs for additional analysis */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 border-b">
                    <h2 className="text-xl font-semibold">Detailed Analysis</h2>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">📜 Script Analysis</h3>
                    <ul className="mb-4 space-y-1">
                      <li>Total Scripts: {results.script_analysis.total_scripts}</li>
                      <li>External Scripts: {results.script_analysis.external_scripts}</li>
                      <li>
                        Suspicious Domains:
                        <ul className="ml-4 mt-1">
                          {results.script_analysis.suspicious_domains.map((domain, index) => (
                            <li key={index} className="text-red-700 font-medium bg-red-50 px-2 py-1 rounded mb-1">❗ {domain}</li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        Minified or Encoded Scripts:
                        <span className={results.script_analysis.minified_or_encoded ? 'text-red-600 ml-1' : 'text-green-600 ml-1'}>
                          {results.script_analysis.minified_or_encoded ? 'Detected' : 'None Detected'}
                        </span>
                      </li>
                    </ul>

                    <h3 className="font-medium text-lg mb-2 mt-6">🔗 Link Analysis</h3>
                    <ul className="space-y-1">
                      <li>Total Links: {results.link_analysis.total_links}</li>
                      <li>External Links: {results.link_analysis.external_links}</li>
                      <li>
                        Redirect Services Used:
                        <ul className="ml-4 mt-1">
                          {results.link_analysis.redirect_services_used.length > 0 ? (
                            results.link_analysis.redirect_services_used.map((service, index) => (
                              <li key={index} className="text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded mb-1">🔄 {service}</li>
                            ))
                          ) : (
                            <li>None</li>
                          )}
                        </ul>
                      </li>
                      <li>
                        Phishing-like Links:
                        <ul className="ml-4 mt-1">
                          {results.link_analysis.phishing_like_links.length > 0 ? (
                            results.link_analysis.phishing_like_links.map((link, index) => (
                              <li key={index} className="text-red-700 font-medium bg-red-50 px-2 py-1 rounded mb-1">⚠️ {link}</li>
                            ))
                          ) : (
                            <li>None</li>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isAnalyzing && !results && !error && (
          <div className="text-center py-8">
            <div className="max-w-md mx-auto bg-blue-50 rounded-lg p-6 mb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Website Security Analysis</h3>
              <p className="text-gray-600 mb-4">
                Our intelligent analysis tool helps you identify potential security risks, phishing attempts, and suspicious content on any website.
              </p>
              <div className="text-sm text-gray-500 bg-white p-3 rounded border">
                <p className="font-medium mb-2">How it works:</p>
                <ol className="list-decimal list-inside space-y-1 text-left">
                  <li>Enter a complete URL (including http:// or https://)</li>
                  <li>Click the "Analyze Website" button</li>
                  <li>Review the comprehensive security report</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
