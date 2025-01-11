"use client";

import {cn} from "@/lib/utils";
import {useRemoveBotAccount, useStartBotAccount, useUpdateBotaccount,} from "@/services/bot-account/hooks";
import {
  AllModelsInterface,
  BotAccountInterface,
  PaymentHistoryInterface,
  ProxyInterface,
  StrategyInterface,
  UserInterface,
} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {Check, ChevronsUpDown, Cog, PencilLine, Play, Trash2,} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {routes} from "@/lib/routes";
import {useRemoveStrategy, useStrategies, useUpdateStrategy,} from "@/services/strategy/hooks";
import {useProxies, useRemoveProxy} from "@/services/proxy/hooks";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList,} from "@/components/ui/command";
import {VisuallyHidden} from "react-aria";
import {useModels, useRemoveModel} from "@/services/models/hooks";
import {Switch} from "@/components/ui/switch";
import {useAllowAccess} from "@/services/users/hooks";

const ProxyCell = ({ proxyId }: { proxyId: string | undefined }) => {
  const { data: proxies = [] } = useProxies();
  const proxy = proxies.find((proxy) => proxy.id === proxyId);
  return <div>{proxy ? proxy.name : ""}</div>;
};

const ProxyActionsCell = ({ row }: { row: { original: ProxyInterface } }) => {
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
          <VisuallyHidden>
            <DialogTitle>Confirmation</DialogTitle>
          </VisuallyHidden>
          <DialogDescription>
            Are you sure you want to delete this proxy?
          </DialogDescription>
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
};

const StrategyCell = ({ row }: { row: { original: any } }) => {
  const { data: strategies = [] } = useStrategies();
  const strategyId =
    typeof row.original.strategy === "object"
      ? row.original.strategy?.id
      : row.original.strategy;
  const strategy = strategies.find((strategy) => strategy.id === strategyId);
  return <div>{strategy ? strategy.name : ""}</div>;
};

const StrategyActionsCell = ({
  row,
}: {
  row: { original: StrategyInterface };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteMutation = useRemoveStrategy(row.original.id);

  const handleDelete = () => {
    deleteMutation.mutate();
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={routes.dashboard.strategy.config(row.original.id)}
        className="btn btn-primary"
      >
        <Cog size={20} strokeWidth={1.25} />
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
              Are you sure you want to delete this strategy?
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
};

const AccountActionsCell = ({
  row,
}: {
  row: { original: BotAccountInterface };
}) => {
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
};

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
              "bg-blue-600": status === "En attente"
            })}
          ></div>
          {status}
        </div>
      );
    },
  },
];

const EditableProxyCell = ({
  row,
}: {
  row: { original: StrategyInterface };
}) => {
  const { data: proxies = [] } = useProxies();
  const updateMutation = useUpdateStrategy(row.original.id);

  const handleProxyChange = (newProxyId: string) => {
    updateMutation.mutate({ proxy: newProxyId });
  };

  const selectedProxyId = row.original.proxy
    ? typeof row.original.proxy === "object"
      ? row.original.proxy.id
      : row.original.proxy
    : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedProxyId
            ? proxies.find((proxy) => proxy.id === selectedProxyId)?.name
            : "Select Proxy"}
          <ChevronsUpDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search proxy..." />
          <CommandList>
            <CommandEmpty>No proxies found.</CommandEmpty>
            {proxies.map((proxy) => (
              <CommandItem
                key={proxy.id}
                value={proxy.name}
                onSelect={() => handleProxyChange(proxy.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    proxy.id === selectedProxyId ? "opacity-100" : "opacity-0",
                  )}
                />
                {proxy.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const EditableStrategyCell = ({
  row,
}: {
  row: { original: BotAccountInterface };
}) => {
  const { data: strategies = [] } = useStrategies();
  const updateMutation = useUpdateBotaccount(row.original.id);

  const handleStrategyChange = (newStrategyId: string) => {
    updateMutation.mutate({ strategy: newStrategyId });
  };

  const selectedStrategyId = row.original.strategy
    ? typeof row.original.strategy === "object"
      ? row.original.strategy.id
      : row.original.strategy
    : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedStrategyId
            ? strategies.find((strategy) => strategy.id === selectedStrategyId)
                ?.name
            : "Select Strategy"}
          <ChevronsUpDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search strategy..." />
          <CommandList>
            <CommandEmpty>No strategies found.</CommandEmpty>
            {strategies.map((strategy) => (
              <CommandItem
                key={strategy.id}
                value={strategy.name}
                onSelect={() => handleStrategyChange(strategy.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    strategy.id === selectedStrategyId
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {strategy.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
const EditableProgressCell = ({
  row,
}: {
  row: { original: BotAccountInterface };
}) => {
  const { data: strategies = [] } = useStrategies();
  const updateMutation = useUpdateBotaccount(row.original.id);
  const [daysNumber, setDaysNumber] = useState<number[]>([]);

  useEffect(() => {
    const strategyId = row.original.strategy
      ? typeof row.original.strategy === "object"
        ? row.original.strategy.id
        : row.original.strategy
      : undefined;

    const strategy = strategies.find((strategy) => strategy.id === strategyId);
    if (strategy) {
      setDaysNumber(
        Array.from({ length: strategy.days_number }, (_, i) => i + 1),
      );
    } else {
      setDaysNumber([]);
    }
  }, [row.original.strategy, strategies]);

  const handleProgressChange = (newProgress: string) => {
    updateMutation.mutate({ progress: parseInt(newProgress, 10) });
  };

  if (daysNumber.length === 0) {
    return <div>{row.original.progress}</div>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {row.original.progress
            ? `Day ${row.original.progress}`
            : "Select Progress"}
          <ChevronsUpDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search progress day..." />
          <CommandList>
            <CommandEmpty>No days found.</CommandEmpty>
            {daysNumber.map((day) => (
              <CommandItem
                key={day}
                value={day.toString()}
                onSelect={() => handleProgressChange(day.toString())}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    row.original.progress === day ? "opacity-100" : "opacity-0",
                  )}
                />
                {day}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Modification de la colonne "Proxy" dans `strategyListColumns`
export const strategyListColumns: ColumnDef<StrategyInterface>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "days_number",
    header: "Days Number",
  },
  {
    accessorKey: "proxy",
    header: "Proxy",
    cell: ({ row }) => <EditableProxyCell row={row} />, // Utilisation de la cellule modifiable
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <StrategyActionsCell row={row} />,
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
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <ProxyActionsCell row={row} />,
  },
];

const ModelCell = ({ row }: { row: { original: BotAccountInterface } }) => {
  const { data: models = [] } = useModels();
  const modelId = row.original.modele;
  const model = models.find((model) => model.id === modelId);

  return <div>{model ? model.name : ""}</div>;
};

export const accountListColumns: ColumnDef<BotAccountInterface>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "modele",
    header: "Model",
    cell: ModelCell,
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
      } else if ( row.original.status === "working") {
        return <Badge className="bg-purple-700">Working</Badge>;
      } else {
        return <Badge className="bg-gray-800">{row.original.status}</Badge>;
      }
    },
  },
  {
    accessorKey: "progress",
    header: "Day Progress",
    cell: ({ row }) => <EditableProgressCell row={row} />,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <EditableStrategyCell row={row} />,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <AccountActionsCell row={row} />,
  },
];

const ModelActionsCell = ({
  row,
}: {
  row: { original: AllModelsInterface };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteMutation = useRemoveModel(row.original.id);

  const handleDelete = () => {
    deleteMutation.mutate();
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={routes.dashboard.model.update(row.original.id)}
        className="btn btn-primary"
      >
        <PencilLine size={20} color="#2b00ff" strokeWidth={1.25} />
      </Link>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button className="btn btn-danger">
            <Trash2 size={20} color="#ff0000" strokeWidth={1.25} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this model? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const modelListColumns: ColumnDef<AllModelsInterface>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "account_count",
    header: "Account Count",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <ModelActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: { original: UserInterface } }) => {
  const allow_access = useAllowAccess(row.original.id);

  const handleToggle = () => {
    allow_access.mutate();
  };

  return (
    <div className="flex items-center gap-2">
      <Switch checked={row.original.is_active} onCheckedChange={handleToggle} />
    </div>
  );
};

export const usersListColumns: ColumnDef<UserInterface>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ActionsCell,
  },
];
