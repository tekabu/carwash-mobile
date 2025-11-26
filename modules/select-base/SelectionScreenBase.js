import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SelectionScreenBase({
  navigation,
  items,
  title,
  subtitle,
  buttonLabel = 'Select',
  initialIndex = 0,
  onSelect,
}) {
  const hasItems = items && items.length > 0;
  const boundedIndex = useMemo(() => {
    if (!hasItems) {
      return 0;
    }
    return Math.max(0, Math.min(initialIndex, items.length - 1));
  }, [initialIndex, items.length, hasItems]);
  const [activeIndex, setActiveIndex] = useState(boundedIndex);
  useEffect(() => {
    setActiveIndex(boundedIndex);
  }, [boundedIndex]);
  const current = hasItems ? items[activeIndex] : null;

  const handlePrev = () => {
    if (!hasItems) {
      return;
    }
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (!hasItems) {
      return;
    }
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleSelect = () => {
    if (!hasItems) {
      return;
    }
    onSelect(current);
    navigation.goBack();
  };

  const imageSource = current?.assetSource ?? require('../../assets/logo.png');
  const selectDisabled = !hasItems;
  const price = current?.price ?? 0;
  const formattedPrice = Number.isFinite(price)
    ? `P ${price
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    : 'P 0.00';

  return (
    <View style={styles.container}>
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>Carwash Customization</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.carousel}>
        <TouchableOpacity
          style={[styles.navButton, !hasItems && styles.navButtonDisabled]}
          onPress={handlePrev}
          disabled={!hasItems}
        >
          <Text style={styles.navSymbol}>&larr;</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.cardLabel}>
            {current?.title ? current.title.toUpperCase() : 'Awaiting Data'}
          </Text>
          <Text style={styles.cardType}>
            {current?.subtitle || (hasItems ? '' : 'No options available yet')}
          </Text>
          {hasItems && (
            <Text style={styles.cardPrice} accessibilityLabel="Selection price">
              {formattedPrice}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.navButton, !hasItems && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!hasItems}
        >
          <Text style={styles.navSymbol}>&rarr;</Text>
        </TouchableOpacity>
      </View>

      {!hasItems && (
        <Text style={styles.emptyState}>
          No selections available. Please scan a card to load vehicle and soap types.
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.selectButton,
          selectDisabled && styles.selectButtonDisabled,
        ]}
        onPress={handleSelect}
        activeOpacity={0.85}
        disabled={selectDisabled}
      >
        <Text style={styles.selectButtonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingTop: 48,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerBadge: {
    backgroundColor: '#1f7b2c',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  headerBadgeText: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1b1b1b',
  },
  subtitle: {
    fontSize: 16,
    color: '#4d4d4d',
    marginBottom: 24,
  },
  carousel: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 32,
  },
  navButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#bdbdbdff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
  navButtonDisabled: {
    opacity: 0.35,
  },
  navSymbol: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4b4b4b',
    transform: [{ translateY: -5 }],
    lineHeight: 30,
  },
  card: {
    flex: 1,
    marginHorizontal: 12,
    borderRadius: 26,
    backgroundColor: '#fafafa',
    padding: 24,
    alignItems: 'center',
  },
  imageWrapper: {
    width: Math.min(width * 0.72, 320),
    height: Math.min(width * 0.72, 320),
    borderRadius: 20,
    backgroundColor: 'transparent',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '96%',
    height: '96%',
    backgroundColor: 'transparent',
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  cardType: {
    fontSize: 16,
    color: '#4b4b4b',
  },
  cardPrice: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#1f7b2c',
  },
  selectButton: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 28,
    backgroundColor: '#1f7b2c',
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1f7b2c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  selectButtonDisabled: {
    opacity: 0.5,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyState: {
    marginBottom: 16,
    color: '#666',
    textAlign: 'center',
  },
});
