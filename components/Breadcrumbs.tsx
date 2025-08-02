"use client";

import { Box, Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { CALCULATORS } from "@/lib/data/calculators";
import { CALCULATOR_CATEGORIES } from "@/lib/config/constants";

interface BreadcrumbsProps {
  customBreadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ customBreadcrumbs }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  if (customBreadcrumbs) {
    return (
      <Box sx={{ py: 1, overflow: "hidden" }}>
        <MuiBreadcrumbs 
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              flexWrap: { xs: "wrap", sm: "nowrap" },
              overflowX: { xs: "visible", sm: "auto" },
            },
            "& .MuiBreadcrumbs-li": {
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              minWidth: 0,
              "& > *": {
                whiteSpace: { xs: "normal", sm: "nowrap" },
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "block",
                maxWidth: { xs: "120px", sm: "200px" }
              }
            }
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            Início
          </Link>
          {customBreadcrumbs.map((breadcrumb, index) => {
            const isLast = index === customBreadcrumbs.length - 1;
            return isLast ? (
              <Typography key={index} color="text.primary">
                {breadcrumb.label}
              </Typography>
            ) : (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                href={breadcrumb.href || "#"}
              >
                {breadcrumb.label}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    );
  }

  // Auto-generate breadcrumbs based on current path
  const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];
  
  if (pathSegments.length === 0) {
    return null; // Don't show breadcrumbs on homepage
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Início", href: "/" }
  ];

  // Check if this is a calculator page
  const currentCalculator = pathname ? CALCULATORS.find(calc => 
    calc.path === pathname || calc.path.endsWith(pathname)
  ) : undefined;

  if (currentCalculator) {
    breadcrumbs.push(
      { label: "Calculadoras", href: "/" },
      { 
        label: CALCULATOR_CATEGORIES[currentCalculator.category as keyof typeof CALCULATOR_CATEGORIES]?.name || "Calculadoras", 
        href: `/#${currentCalculator.category}` 
      },
      { label: currentCalculator.title }
    );
  } else {
    // Generate breadcrumbs from path segments
    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
      
      let label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      // Map specific segments to better labels
      const segmentMap: Record<string, string> = {
        "calculadoras": "Calculadoras",
        "sobre": "Sobre",
        "privacidade": "Política de Privacidade"
      };
      
      label = segmentMap[segment] || label;
      
      breadcrumbs.push(isLast ? { label } : { label, href });
    });
  }

  return (
    <Box sx={{ py: 1, overflow: "hidden" }}>
      <MuiBreadcrumbs 
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-ol": {
            flexWrap: { xs: "wrap", sm: "nowrap" },
            overflowX: { xs: "visible", sm: "auto" },
          },
          "& .MuiBreadcrumbs-li": {
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            minWidth: 0,
            "& > *": {
              whiteSpace: { xs: "normal", sm: "nowrap" },
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "block",
              maxWidth: { xs: "120px", sm: "200px" }
            }
          }
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography key={index} color="text.primary">
              {breadcrumb.label}
            </Typography>
          ) : (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={breadcrumb.href || "#"}
            >
              {breadcrumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}