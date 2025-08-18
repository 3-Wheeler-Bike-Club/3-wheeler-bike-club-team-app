"use client"

import { Login } from "./login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Users, FileText, Car, UserCheck, BarChart3, Shield } from "lucide-react";

export function Wrapper() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            3WB Team App
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Comprehensive team management dashboard for 3-wheeler bike club operations. 
            Streamline hire-purchase management, driver registration, and order assignments.
          </p>
          <div className="flex justify-center">
            <Login />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg text-black">Driver Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Register and manage team drivers with on-chain attestation schemas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg text-black">Order Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Create, assign, and track ride orders with real-time updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg text-black">Fleet Operations</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage fleet orders and vehicle assignments efficiently
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg text-black">Member Profiles</CardTitle>
                <CardDescription className="text-gray-600">
                  View and update user profiles, badges, and credit scores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg text-black">Compliance Tracking</CardTitle>
                <CardDescription className="text-gray-600">
                  Monitor regulatory compliance and attestation status
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg text-black">Secure Authentication</CardTitle>
                <CardDescription className="text-gray-600">
                  Enterprise-grade security with Privy authentication
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="px-4 py-16 bg-gradient-to-r from-yellow-100 to-amber-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-2 border-yellow-300 hover:border-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Driver Registration</h3>
                    <p className="text-gray-600">Add new team members and drivers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-2 border-yellow-300 hover:border-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Order Assignment</h3>
                    <p className="text-gray-600">Assign rides and manage fleet orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-2 border-yellow-300 hover:border-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Compliance Dashboard</h3>
                    <p className="text-gray-600">Monitor regulatory requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-2 border-yellow-300 hover:border-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Member Profiles</h3>
                    <p className="text-gray-600">Manage team member information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-200">
            © 2024 3-Wheeler Bike Club Team App. Built with Next.js, TypeScript, and modern web technologies.
          </p>
        </div>
      </div>
    </div>
  );
}