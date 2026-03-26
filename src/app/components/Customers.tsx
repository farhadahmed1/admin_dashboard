import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Search, Mail, Phone, Eye, X } from "lucide-react";
import { mockCustomers, mockOrders, Customer } from "../lib/mock-data";
import { format, isSameMonth } from "date-fns";

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const selectedCustomerOrders = useMemo(() => {
    if (!selectedCustomer) return [];

    return mockOrders
      .filter((order) => order.customer.id === selectedCustomer.id)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [selectedCustomer]);

  const selectedCustomerMonthlyOrders = useMemo(() => {
    const now = new Date();
    return selectedCustomerOrders.filter((order) =>
      isSameMonth(new Date(order.createdAt), now),
    ).length;
  }, [selectedCustomerOrders]);

  const selectedCustomerLastOrder = selectedCustomerOrders[0];

  const selectedCustomerPrescriptions = useMemo(() => {
    return selectedCustomerOrders
      .filter((order) => order.prescription)
      .map((order) => ({
        orderId: order.id,
        orderNumber: order.orderNumber,
        prescription: order.prescription!,
      }));
  }, [selectedCustomerOrders]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer accounts and information
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {customer.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <a
                            href={`mailto:${customer.email}`}
                            className="hover:underline"
                          >
                            {customer.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <a
                            href={`tel:${customer.phone}`}
                            className="hover:underline"
                          >
                            {customer.phone}
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.totalOrders}
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.totalSpent.toLocaleString("sv-SE")} kr
                    </TableCell>
                    <TableCell>
                      {format(new Date(customer.joinedAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "active" ? "default" : "secondary"
                        }
                        className="capitalize"
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCustomer(customer)}
                        title="View Customer Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No customers found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedCustomer && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                <p className="text-muted-foreground">Customer insights</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCustomer(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Total Orders
                </p>
                <p className="text-xl font-bold">
                  {selectedCustomer.totalOrders}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Monthly Orders
                </p>
                <p className="text-xl font-bold">
                  {selectedCustomerMonthlyOrders}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Last Order
                </p>
                {selectedCustomerLastOrder ? (
                  <>
                    <p className="font-medium">
                      {selectedCustomerLastOrder.orderNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(
                        new Date(selectedCustomerLastOrder.createdAt),
                        "MMM dd, yyyy",
                      )}{" "}
                      •{" "}
                      {selectedCustomerLastOrder.total.toLocaleString("sv-SE")}{" "}
                      kr
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No orders yet</p>
                )}
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <h3 className="text-sm font-medium">Contact</h3>
              <p>{selectedCustomer.email}</p>
              <p>{selectedCustomer.phone}</p>
            </div>

            <div className="rounded-lg border p-3">
              <h3 className="text-sm font-medium">Prescription Documents</h3>

              {selectedCustomerPrescriptions.length > 0 ? (
                <div className="space-y-2">
                  {selectedCustomerPrescriptions.map((item) => (
                    <div
                      key={item.orderId}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          Verified: {item.prescription.verified ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={item.prescription.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            View Prescription
                          </Button>
                        </a>
                        <Badge
                          variant={
                            item.prescription.verified
                              ? "default"
                              : "destructive"
                          }
                          className="uppercase"
                        >
                          {item.prescription.verified
                            ? "Verified"
                            : "Unverified"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No prescriptions found for this customer.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Total Customers
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCustomers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">Active</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCustomers.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Avg. Orders
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0) /
                mockCustomers.length
              ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Avg. Spent
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) /
                mockCustomers.length
              ).toLocaleString("sv-SE")}{" "}
              kr
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
