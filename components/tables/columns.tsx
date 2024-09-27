"use client";

import { cn } from "@/lib/utils";
import {
  useRemoveBotAccount,
  useStartBotAccount,
} from "@/services/bot-account/hooks";
import {
  BotAccountInterface,
  PaymentHistoryInterface,
  ProxyInterface,
  StrategyInterface,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Cog, PencilLine, Play, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/routes";
import { useStrategies } from "@/services/strategy/hooks";
import { useProxies, useRemoveProxy } from "@/services/proxy/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export const paymentHistoryColumns: ColumnDef<PaymentHistoryInterface>[] = [
  {
    accessorKey: "pack",
    header: "Pack",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.status;
      let badgeClass = "";

      switch (status) {
        case "Succès":
          badgeClass = "bg-green-100 dark:bg-green-500/20 text-green-500";
          break;
        case "Échoué":
          badgeClass =
            "bg-destructive/10 dark:bg-red-500/20 text-destructive dark:text-red-500/80";
          break;
        case "En attente":
          badgeClass = "bg-blue-100 dark:bg-blue-500/20 text-blue-500";
          break;
        default:
          badgeClass = "bg-gray-100 dark:bg-gray-500/20 text-gray-500";
      }

      return (
        <div
          className={`flex w-fit items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${badgeClass}`}
        >
          <div
            className={cn("size-2 rounded-full", {
              "bg-green-500": status === "Succès",
              "bg-destructive dark:bg-red-500/80": status === "Échoué",
              "bg-blue-600": status === "En attente",
            })}
          ></div>
          {status}
        </div>
      );
    },
  },
];

export const strategyListColumns: ColumnDef<StrategyInterface>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "days_number",
    header: "Nombre de jours",
  },
  {
    accessorKey: "proxy",
    header: "Proxy",
    cell: ({ row }) => {
      const { data: proxies = [] } = useProxies();
      const proxyId =
        typeof row.original.proxy === "object"
          ? row.original.proxy?.id
          : row.original.proxy;
      const proxy = proxies.find((proxy) => proxy.id === proxyId);
      return <div>{proxy ? proxy.name : ""}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const proxyId = row.original.proxy?.id;

      const deleteMutation = useRemoveProxy(proxyId ?? "");

      const handleDelete = () => {
        if (proxyId) {
          deleteMutation.mutate();
          setIsModalOpen(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link
            href={routes.dashboard.strategy.config(row.original.id)}
            className="btn btn-secondary"
          >
            <Cog size={20} color="#afc856" strokeWidth={1.25} />
          </Link>
          <Link
            href={routes.dashboard.strategy.update(row.original.id)}
            className="btn btn-primary"
          >
            <PencilLine size={20} color="#2b00ff" strokeWidth={1.25} />
          </Link>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="btn btn-secondary">
                <Trash2 size={20} color="#ff0000" strokeWidth={1.25} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this proxy?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export const proxyListColumns: ColumnDef<ProxyInterface>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "host",
    header: "Host",
  },
  {
    accessorKey: "port",
    header: "Port",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const deleteMutation = useRemoveProxy(row.original.id);

      const handleDelete = () => {
        deleteMutation.mutate();
        setIsModalOpen(false);
      };

      return (
        <div className="flex items-center gap-2">
          <Link
            href={routes.dashboard.proxy.update(row.original.id)}
            className="btn btn-primary"
          >
            <PencilLine size={20} color="#2b00ff" strokeWidth={1.25} />
          </Link>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="btn btn-secondary">
                <Trash2 size={20} color="#ff0000" strokeWidth={1.25} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this proxy?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export const accountListColumns: ColumnDef<BotAccountInterface>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "modele",
    header: "Model",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.status === "active") {
        return <Badge className="bg-green-800">Active</Badge>;
      } else if (row.original.status === "failed") {
        return <Badge className="bg-amber-800">Token Expired</Badge>;
      } else if (row.original.status === "shadowBan") {
        return <Badge variant="destructive">Ban</Badge>;
      } else if (row.original.status === "standby") {
        return <Badge className="bg-blue-800">Inactive</Badge>;
      }
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => {
      const { data: strategies = [] } = useStrategies();
      const strategyId =
        typeof row.original.strategy === "object"
          ? row.original.strategy?.id
          : row.original.strategy;
      const strategy = strategies.find(
        (strategy) => strategy.id === strategyId,
      );
      return <div>{strategy ? strategy.name : ""}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const deleteMutation = useRemoveBotAccount(row.original.id);

      const handleDelete = () => {
        deleteMutation.mutate();
        setIsModalOpen(false);
      };

      const startMutation = useStartBotAccount(row.original.id);
      const handleStart = () => {
        startMutation.mutate();
      };

      return (
        <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={handleStart}>
            <Play size={20} color="#065c00" strokeWidth={1.25} />
          </button>
          <Link
            href={routes.dashboard.account.update(row.original.id)}
            className="btn btn-primary"
          >
            <PencilLine size={20} color="#2b00ff" strokeWidth={1.25} />
          </Link>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="btn btn-secondary">
                <Trash2 size={20} color="#ff0000" strokeWidth={1.25} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
