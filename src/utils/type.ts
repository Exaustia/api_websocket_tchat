export type Site = {
  name: string;
  defaultCreator: {
    default: string;
  };
  collection: string;
  timeBeforeNextClaim: number;
  time: string;
  title: string;
  token: string;
  logo: string;
  website: string;
  isStaking: boolean;
  tweet: string;
  styles: {
    cardBackground: string;
    cardTextColor: string;
    globalBackground: string;
    cardSpecialColor: string;
    cardBorderRadius: string;
    cardTitleFontSize: string;
    cardTextFontSize: string;
    fontFamily: string;
    buttonBackground: string;
    buttonBorderRadius: string;
    logoSize: string;
    backgroundImage?: string;
  };
  inspectBaseUrl: string;
  SOLANA_ENDPOINT: string;
};

export type Sites = {
  [key: string]: Site;
};

export type SiteName = keyof Sites;

export type SiteNameAndSite = {
  name: SiteName;
  site: Site;
};
