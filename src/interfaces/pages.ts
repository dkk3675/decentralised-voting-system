export interface setPage {
  phase?: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
}

export interface contractTS extends setPage{
  election?: any;
  web3?: any;
}

export interface setRegistration extends contractTS{
  isNotRegistered?: boolean;
  setIsNotRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface setVoted{
  hasVoted?: boolean;
  setHasVoted: React.Dispatch<React.SetStateAction<boolean>>;
}
