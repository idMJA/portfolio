'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';

interface WakaTimeStats {
  total_seconds: number;
  languages: Array<{
    name: string;
    percent: number;
    total_seconds: number;
  }>;
  editors: Array<{
    name: string;
    percent: number;
    total_seconds: number;
  }>;
  start_date: string;
  human_readable_range: string;
}

export default function WakaTimeStats() {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/wakatime/stats');
        if (!response.ok) throw new Error('Failed to fetch WakaTime stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Coding Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Coding Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (days > 0) {
      return `${days}d ${remainingHours}h`;
    }
    return `${hours}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All-Time Coding Activity</CardTitle>
        <p className="text-sm text-gray-400">{stats.human_readable_range}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Coding Time</h3>
            <p className="text-2xl font-bold">{formatTime(stats.total_seconds)}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <div className="space-y-2">
              {stats.languages.slice(0, 5).map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{lang.name}</span>
                    <span>{formatTime(lang.total_seconds)} ({lang.percent.toFixed(1)}%)</span>
                  </div>
                  <Progress value={lang.percent} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Editors</h3>
            <div className="space-y-2">
              {stats.editors.map((editor) => (
                <div key={editor.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{editor.name}</span>
                    <span>{formatTime(editor.total_seconds)} ({editor.percent.toFixed(1)}%)</span>
                  </div>
                  <Progress value={editor.percent} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 