# Django
from django.core.exceptions import PermissionDenied

# restframework
from rest_framework import viewsets, status
from rest_framework.response import Response

# local apps
from saleorder.models import SaleOrder
from picking.models import Picking
from picking.api.serializers import PickingSerializer

class PickingsViewSet(viewsets.ModelViewSet):
    """Picking view set."""
    queryset = Picking.objects.all()
    serializer_class = PickingSerializer

    def list(self, request, *args, **kwargs):
        saleorder = kwargs.get('saleorder')
        saleorder = SaleOrder.objects.filter(no_sale_order=saleorder)
        
        if saleorder is not None:
            try:
                self.queryset = self.queryset.filter(sale_order=saleorder)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)

        if not saleorder:
            raise PermissionDenied('A saleorder parameter is required.')
        return super().list(request, *args, **kwargs)