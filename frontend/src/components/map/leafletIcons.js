import L from 'leaflet';

/**
 * Creates custom divIcon for monuments matching Stitch design
 */
export function createMonumentIcon(monument, isSelected = false) {
  const isSpecial = monument.ranking === 'Quốc gia đặc biệt';
  const isNational = monument.ranking === 'Quốc gia';

  let bgClass = 'bg-sky-600';
  let iconName = 'temple_buddhist';
  let ringClass = 'ring-sky-200';

  if (isSpecial) {
    bgClass = 'bg-lotus-600 hover:bg-lotus-700';
    iconName = 'local_florist';
    ringClass = 'ring-lotus-300';
  } else if (isNational) {
    bgClass = 'bg-tram-600 hover:bg-tram-700';
    iconName = 'account_balance';
    ringClass = 'ring-tram-200';
  }

  const size = isSelected ? 46 : isSpecial ? 40 : 34;
  const iconSize = isSelected ? 24 : isSpecial ? 20 : 18;

  const html = `
    <div class="relative flex items-center justify-center group cursor-pointer" style="width: ${size}px; height: ${size}px;">
      ${
        isSelected
          ? `<span class="absolute -inset-3 rounded-full bg-lotus-500/30 animate-ping"></span>
             <span class="absolute -inset-1.5 rounded-full bg-lotus-500/20"></span>`
          : isSpecial
          ? `<span class="absolute -inset-2 rounded-full bg-lotus-400/20 animate-pulse"></span>`
          : ''
      }
      <div class="w-full h-full rounded-full ${bgClass} text-white flex items-center justify-center shadow-lg ring-3 ${ringClass} transition-all duration-300 transform group-hover:scale-110">
        <span class="material-symbols-outlined" style="font-size: ${iconSize}px;">${iconName}</span>
      </div>
      ${
        isSpecial
          ? `<span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-bold shadow-xs">★</span>`
          : ''
      }
    </div>
  `;

  return L.divIcon({
    html,
    className: 'lotus-marker-wrapper',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 8],
  });
}

/**
 * Creates custom divIcon for user GPS location
 */
export function createUserGpsIcon() {
  const html = `
    <div class="relative flex items-center justify-center" style="width: 38px; height: 38px;">
      <span class="absolute -inset-2.5 rounded-full bg-tram-500/30 animate-ping"></span>
      <span class="absolute -inset-1 rounded-full bg-tram-500/20"></span>
      <div class="w-8 h-8 rounded-full bg-tram-600 text-white flex items-center justify-center shadow-xl ring-4 ring-white">
        <span class="material-symbols-outlined" style="font-size: 18px;">person_pin_circle</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'lotus-marker-wrapper',
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });
}
