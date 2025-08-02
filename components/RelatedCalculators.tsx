"use client";

import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia 
} from "@mui/material";
import Image from "next/image";
import { CALCULATORS } from "@/lib/data/calculators";
import { componentStyles } from "@/src/styles/components";

interface RelatedCalculatorsProps {
  currentCalculatorId?: string;
  category?: string;
  maxItems?: number;
}

export default function RelatedCalculators({ 
  currentCalculatorId, 
  category, 
  maxItems = 3 
}: RelatedCalculatorsProps) {
  
  let relatedCalculators = CALCULATORS.filter(calc => calc.id !== currentCalculatorId);
  
  // If category is provided, prioritize calculators from the same category
  if (category) {
    const sameCategory = relatedCalculators.filter(calc => calc.category === category);
    const otherCategories = relatedCalculators.filter(calc => calc.category !== category);
    relatedCalculators = [...sameCategory, ...otherCategories];
  }
  
  // Limit the number of related calculators
  relatedCalculators = relatedCalculators.slice(0, maxItems);
  
  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: "center",
          color: "primary.main"
        }}
      >
        Outras Calculadoras
      </Typography>
      
      <Grid container spacing={2}>
        {relatedCalculators.map((calculator) => (
          <Grid key={calculator.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={componentStyles.homepage.toolCard}>
              <CardActionArea
                href={calculator.path}
                sx={componentStyles.homepage.toolCardAction}
              >
                <CardMedia sx={componentStyles.homepage.toolCardMedia}>
                  <Image
                    src={calculator.image}
                    alt={calculator.title}
                    fill
                    style={{ 
                      objectFit: "contain",
                      objectPosition: "center",
                      padding: "8px"
                    }}
                  />
                </CardMedia>
                <CardContent sx={componentStyles.homepage.toolCardContent}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={componentStyles.homepage.toolCardTitle}
                  >
                    {calculator.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={componentStyles.homepage.toolCardDescription}
                  >
                    {calculator.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}