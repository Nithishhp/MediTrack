import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface RatingProps {
  rating: number;
  totalReviews?: number;
  size?: number;
  showNumber?: boolean;
}

export default function Rating({ rating, totalReviews, size = 16, showNumber = true }: RatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Ionicons key={i} name="star" size={size} color={Colors.star} />);
    } else if (i - 0.5 <= rating) {
      stars.push(<Ionicons key={i} name="star-half" size={size} color={Colors.star} />);
    } else {
      stars.push(<Ionicons key={i} name="star-outline" size={size} color={Colors.star} />);
    }
  }

  return (
    <View style={styles.container}>
      {stars}
      {showNumber && <Text style={styles.rating}>{rating.toFixed(1)}</Text>}
      {totalReviews !== undefined && <Text style={styles.reviews}>({totalReviews})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  rating: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, marginLeft: Spacing.xs },
  reviews: { fontSize: FontSize.xs, color: Colors.textSecondary },
});
