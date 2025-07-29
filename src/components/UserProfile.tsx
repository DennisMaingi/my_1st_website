import React, { useState } from 'react';
import { User, LogOut, Settings, Shield, UserCheck, ChevronDown } from 'lucide-react';

interface UserProfileProps {
  user: { username: string; role: 'client' | 'admin' } | null;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          user.role === 'admin' 
            ? 'bg-gradient-to-r from-red-500 to-pink-500' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}>
          {user.role === 'admin' ? (
            <Shield className="w-4 h-4 text-white" />
          ) : (
            <UserCheck className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
          isDropdownOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role} Account</p>
          </div>
          
          <div className="py-2">
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Profile</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Settings className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
            </button>
            
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};