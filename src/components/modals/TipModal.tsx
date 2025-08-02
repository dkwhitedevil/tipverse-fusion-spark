import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Zap, Clock, TrendingUp, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
  content: {
    text?: string;
    timeRemaining: string;
  };
}

const tokens = [
  { symbol: "USDC", balance: "1,250.00", usdValue: "1.00", icon: "💲" },
  { symbol: "ETH", balance: "2.45", usdValue: "2,340.50", icon: "Ξ" },
  { symbol: "DAI", balance: "850.00", usdValue: "1.00", icon: "◈" },
  { symbol: "WBTC", balance: "0.05", usdValue: "43,500.00", icon: "₿" },
];

export const TipModal = ({ isOpen, onClose, creator, content }: TipModalProps) => {
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);
  const usdValue = selectedTokenData ? (parseFloat(amount || "0") * parseFloat(selectedTokenData.usdValue)).toFixed(2) : "0.00";
  const earlyBonus = Math.max(1, 24 - parseInt(content.timeRemaining.split('h')[0] || "0")) * 0.1;

  const handleTip = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid tip amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Tip sent successfully! 🎉",
      description: `You tipped ${amount} ${selectedToken} to @${creator.username} and earned ${(parseFloat(amount) * (1 + earlyBonus)).toFixed(0)} XP!`,
    });
    
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-border/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-xl">
            Tip @{creator.username}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Token Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select Token
            </label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="glass border-border/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-strong border-border/30">
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{token.icon}</span>
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          Balance: {token.balance}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Amount
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="glass border-border/20 pr-16"
                step="0.01"
                min="0.01"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {selectedToken}
              </div>
            </div>
            {amount && (
              <div className="text-sm text-muted-foreground mt-1">
                ≈ ${usdValue} USD
              </div>
            )}
          </div>

          {/* Quick Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {["1", "5", "10", "25"].map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount)}
                className="glass border-border/20"
              >
                {quickAmount}
              </Button>
            ))}
          </div>

          {/* Tip Info */}
          <div className="bg-gradient-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-muted-foreground">Time remaining</span>
              </div>
              <span className="text-warning font-medium">{content.timeRemaining}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Early bonus</span>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                +{(earlyBonus * 100).toFixed(0)}% XP
              </Badge>
            </div>
            
            {amount && (
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/20">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">XP earned</span>
                </div>
                <span className="text-primary font-bold">
                  +{(parseFloat(amount) * (1 + earlyBonus)).toFixed(0)} XP
                </span>
              </div>
            )}
          </div>

          {/* Gas Estimation */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Estimated gas</span>
            <span>~$0.15</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 glass border-border/20"
            >
              Cancel
            </Button>
            <Button
              variant="gaming"
              onClick={handleTip}
              disabled={!amount || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4" />
                  Send Tip
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};